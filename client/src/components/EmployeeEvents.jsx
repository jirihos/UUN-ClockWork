import { useEffect, useState } from "react";
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
} from "semantic-ui-react";
import ModalAddEvent from "./ModalAddEvent";

const Employee = ({ code }) => {
  const [shiftData, setShiftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const call = useCall();

  useEffect(() => {
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

    fetchShiftData();
  }, [code, call]);

  const handleDelete = async () => {
    try {
      await call("POST", "/api/event/delete", { _id: currentId });
      setShiftData(shiftData.filter((entry) => entry._id !== currentId));
      setModalOpen(false);
    } catch (err) {
      setError(err);
      setModalOpen(false);
    }
  };

  const openModal = (id) => {
    setCurrentId(id);
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
      <ModalAddEvent employeeCode={code} />
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
                <TableCell className="table-cell">
                  <Label ribbon>
                    <FontAwesomeIcon
                      icon={faDoorOpen}
                      className="arrival-icon"
                    />
                    {new Date(entry.arrivalTimestamp).toLocaleDateString()}
                  </Label>
                  {new Date(entry.arrivalTimestamp).toLocaleTimeString()}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => openModal(entry._id)}
                  />
                </TableCell>
                <TableCell className="table-cell">
                  <Label ribbon>
                    <FontAwesomeIcon
                      icon={faDoorClosed}
                      className="departure-icon"
                    />
                    {new Date(entry.leaveTimestamp).toLocaleDateString()}
                  </Label>
                  {new Date(entry.leaveTimestamp).toLocaleTimeString()}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => openModal(entry._id)}
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

export default Employee;
