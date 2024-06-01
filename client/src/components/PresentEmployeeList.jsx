import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Header,
  Icon,
  List,
  ListContent,
  ListItem,
  Pagination,
  Placeholder,
  PlaceholderLine,
  Segment,
} from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import Error from "./Error";

const PresentEmployeesList = () => {
  const call = useCall();
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(-1);
  const loaded = totalPages !== -1;
  const pageSize = 5;

  const reload = useCallback(async () => {
    setTotalPages(-1);
    const pageIndex = activePage - 1;
    let data;
    try {
      data = await call(
        "GET",
        `/api/employee/listPresent?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      );
    } catch (e) {
      setError(e);
      throw e;
    }
    setEmployees(data.items);
    const { totalCount } = data.pageInfo;
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [call, activePage]);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <div style={{ minWidth: 300, maxWidth: 400 }}>
      <Header attached="top" size="huge">
        Present Employees
      </Header>
      <Segment
        attached
        loading={!loaded && !error}
        placeholder={totalPages === 0}
      >
        {totalPages > 0 && (
          <>
            <List divided>
              {employees.map((employee) => (
                <ListItem key={employee.code} style={{ padding: "8px 0" }}>
                  <ListContent>
                    <Icon name="user" style={{ marginRight: 5 }} />
                    <Link
                      to={`/employee/${employee.code}`}
                    >{`${employee.firstName} ${employee.lastName}`}</Link>
                  </ListContent>
                </ListItem>
              ))}
            </List>
            <div className="center-horizontal">
              <Pagination
                activePage={activePage}
                onPageChange={(_, data) => {
                  setActivePage(data.activePage);
                }}
                totalPages={totalPages}
              />
            </div>
          </>
        )}

        {totalPages === 0 && (
          <div className="center" style={{ flexDirection: "column" }}>
            <Header>No employees are present</Header>
            <Button color="teal" onClick={reload}>
              Reload
            </Button>
          </div>
        )}

        {!loaded && !error && (
          <Placeholder>
            {Array.from({ length: pageSize * 2 }).map((_, index) => (
              <PlaceholderLine key={index} />
            ))}
          </Placeholder>
        )}

        {error && <Error error={error} />}
      </Segment>
    </div>
  );
};

export default PresentEmployeesList;
