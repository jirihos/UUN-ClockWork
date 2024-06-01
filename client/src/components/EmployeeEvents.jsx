import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faDoorClosed,
  faTrash,
  faTimes,
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
} from "semantic-ui-react";

const EmployeeEvents = ({ code }) => {
  const [shiftData, setShiftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const call = useCall();

  const fetchShiftData = async () => {
    try {
      const response = await call(
        "GET",
        `/api/event/listShiftsByEmployeeCode?pageIndex=0&pageSize=30&employeeCode=${code}`,
      );
      setShiftData(response.items);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShiftData();
  }, [code, call]);

  const handleDelete = async () => {
    try {
      const response = await call("POST", "/api/event/delete", {
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error)
    return <div className="error">Error loading data: {error.message}</div>;

  return (
    <div className="container">
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
                        ? new Date(entry.arrivalTimestamp).toLocaleDateString()
                        : "No record"}
                    </span>
                  </Label>
                  <span style={{ color: entry.arrivalTimestamp ? "" : "red" }}>
                    {entry.arrivalTimestamp
                      ? new Date(entry.arrivalTimestamp).toLocaleTimeString()
                      : ""}
                  </span>
                  <FontAwesomeIcon
                    icon={entry.arrivalTimestamp ? faTrash : ""}
                    className={`delete-icon ${entry.arrivalTimestamp ? "" : "red-icon"}`}
                    onClick={() => openModal(entry.arrivalEventId, "arrival")}
                  />
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
                    <span style={{ color: entry.leaveTimestamp ? "" : "red" }}>
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
                  <FontAwesomeIcon
                    icon={entry.leaveTimestamp ? faTrash : ""}
                    className={`delete-icon ${entry.leaveTimestamp ? "" : "red-icon"}`}
                    onClick={() => openModal(entry.leaveEventId, "leave")}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

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
