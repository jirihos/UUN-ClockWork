import { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faDoorClosed,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useCall } from "../helpers/call-helper";
import "../css/employee.css";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Label,
  Modal,
  Button,
  Pagination,
  TableFooter,
  Loader,
  Dimmer,
  DimmerDimmable,
} from "semantic-ui-react";
import Error from "./Error";

const EmployeeEvents = ({ code }) => {
  const [shiftData, setShiftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const call = useCall();

  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(-1);
  const pageSize = 10;
  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / pageSize);
  }, [totalCount]);

  const fetchShiftData = useCallback(async () => {
    setLoading(true);
    const pageIndex = activePage - 1;
    try {
      const response = await call(
        "GET",
        `/api/event/listShiftsByEmployeeCode?pageIndex=${pageIndex}&pageSize=${pageSize}&employeeCode=${code}`,
      );
      setShiftData(response.items);
      const { totalCount } = response.pageInfo;
      setTotalCount(totalCount);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [call, code, activePage]);

  useEffect(() => {
    fetchShiftData();
  }, [fetchShiftData]);

  const handleDelete = async () => {
    try {
      await call("POST", "/api/event/delete", {
        _id: currentId,
      });
      await fetchShiftData();
      setModalOpen(false);
    } catch (err) {
      setError(err);
      setModalOpen(false);
    }
  };

  const openModal = (id, type) => {
    setCurrentId(id);
    setDeleteType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (error) return <Error error={error} />;

  return (
    <div className="container">
      <DimmerDimmable>
        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Arrival</TableHeaderCell>
              <TableHeaderCell>Departure</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {shiftData &&
              shiftData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Label ribbon>
                      <FontAwesomeIcon
                        icon={faDoorOpen}
                        className={`arrival-icon ${entry.arrivalTimestamp ? "" : "red-icon"}`}
                        color={entry.arrivalTimestamp ? "black" : "red"}
                      />
                      <span
                        style={{
                          color: entry.arrivalTimestamp ? "" : "red",
                        }}
                      >
                        {entry.arrivalTimestamp
                          ? new Date(
                              entry.arrivalTimestamp,
                            ).toLocaleDateString()
                          : "No record"}
                      </span>
                    </Label>
                    <span
                      style={{ color: entry.arrivalTimestamp ? "" : "red" }}
                    >
                      {entry.arrivalTimestamp
                        ? new Date(entry.arrivalTimestamp).toLocaleTimeString()
                        : ""}
                    </span>
                    {entry.arrivalTimestamp && (
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="delete-icon"
                        onClick={() =>
                          openModal(entry.arrivalEventId, "arrival")
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell
                    className={`table-cell ${entry.leaveTimestamp ? "" : "no-record"}`}
                  >
                    <Label ribbon>
                      <FontAwesomeIcon
                        icon={faDoorClosed}
                        className={`departure-icon ${entry.leaveTimestamp ? "" : "red-icon"}`}
                        color={entry.leaveTimestamp ? "black" : "red"}
                      />
                      <span
                        style={{ color: entry.leaveTimestamp ? "" : "red" }}
                      >
                        {entry.leaveTimestamp
                          ? new Date(entry.leaveTimestamp).toLocaleDateString()
                          : "No record"}
                      </span>
                    </Label>
                    <span style={{ color: entry.leaveTimestamp ? "" : "red" }}>
                      {entry.leaveTimestamp
                        ? new Date(entry.leaveTimestamp).toLocaleTimeString()
                        : ""}
                    </span>
                    {entry.leaveTimestamp && (
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="delete-icon"
                        onClick={() => openModal(entry.leaveEventId, "leave")}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHeaderCell colSpan="2">
                <div
                  className="center-vertical"
                  style={{
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    rowGap: "8px",
                    columnGap: "12px",
                  }}
                >
                  <span>Found {totalCount} shifts</span>
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
              </TableHeaderCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Dimmer active={loading} inverted>
          <Loader />
        </Dimmer>
      </DimmerDimmable>

      <Modal open={modalOpen} onClose={closeModal} size="small">
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this entry?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} negative>
            No
          </Button>
          <Button onClick={handleDelete} positive>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default EmployeeEvents;
