import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dimmer,
  DimmerDimmable,
  Header,
  Icon,
  Loader,
  Pagination,
  Segment,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import Error from "./Error";

const EmployeeSearchResults = ({ filter, departments }) => {
  const call = useCall();
  const [error, setError] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [callState, setCallState] = useState("pending");
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(-1);
  const pageSize = 10;

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / pageSize);
  }, [totalCount]);

  departments = useMemo(() => {
    if (departments == null) return [];
    return departments;
  }, [departments]);

  const reloadEmployees = useCallback(async () => {
    setError(null);
    if (Object.keys(filter).length > 0) {
      setCallState("pending");
      const pageIndex = activePage - 1;
      filter.pageInfo = {
        pageIndex,
        pageSize,
      };
      const callPromise = call("POST", "/api/employee/search", filter);
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 200));
      let response;
      try {
        [response] = await Promise.all([callPromise, timeoutPromise]);
      } catch (e) {
        setCallState("error");
        setError(e);
        throw e;
      }
      const items = response.items;
      items.forEach((item) => {
        const department = departments.find(
          (dep) => dep._id === item.departmentId,
        );
        item.departmentName = department?.name || "Invalid department";
      });
      setEmployeeList(items);
      const { totalCount } = response.pageInfo;
      setTotalCount(totalCount);
      if (totalCount > 0) {
        setCallState("done");
      } else {
        setCallState("noResults");
      }
    } else {
      setEmployeeList([]);
      setTotalCount(0);
      setCallState("noResults");
    }
  }, [call, filter, departments, activePage]);

  useEffect(() => {
    reloadEmployees();
  }, [reloadEmployees]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setActivePage(1);
  }, [filter]);

  return (
    <>
      {(callState === "done" || callState === "pending") && (
        <DimmerDimmable>
          <Table selectable unstackable>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Department</TableHeaderCell>
                <TableHeaderCell>First name</TableHeaderCell>
                <TableHeaderCell>Last name</TableHeaderCell>
                <TableHeaderCell>Code</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employeeList.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.departmentName}</TableCell>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.code}</TableCell>
                  <TableCell textAlign="center">
                    <Link to={`/employee/${employee.code}`}>
                      <Icon name="linkify" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableHeaderCell colSpan="5">
                  {
                    <div
                      className="center-vertical"
                      style={{
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        rowGap: "8px",
                        columnGap: "12px",
                      }}
                    >
                      <span>Found {totalCount} employees</span>
                      <Pagination
                        siblingRange={2}
                        boundaryRange={1}
                        nextItem={null}
                        prevItem={null}
                        firstItem={null}
                        lastItem={null}
                        activePage={activePage}
                        onPageChange={(e, data) => {
                          setActivePage(data.activePage);
                        }}
                        totalPages={totalPages}
                      />
                    </div>
                  }
                </TableHeaderCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Dimmer active={callState === "pending"} inverted>
            <Loader />
          </Dimmer>
        </DimmerDimmable>
      )}

      {callState === "noResults" && (
        <Segment placeholder>
          <Header as="h2" textAlign="center">
            No results
          </Header>
        </Segment>
      )}

      {error && <Error error={error} />}
    </>
  );
};

export default EmployeeSearchResults;
