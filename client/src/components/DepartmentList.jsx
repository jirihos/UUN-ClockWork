import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Icon, Modal } from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalAddDepartment from "./ModalAddDepartment";
import Error from "./Error";

const DepartmentList = () => {
  const call = useCall();
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [openDepartmentModal, setOpenDepartmentModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await call("GET", "/api/department/list");
        setDepartments(data.items);
      } catch (error) {
        setError(error);
        throw error;
      }
    };

    loadData();
  }, [call]);

  const handleAddDepartmentSuccess = (newDepartment) => {
    setDepartments([...departments, newDepartment]);
  };

  const handleDeleteDepartment = async () => {
    try {
      await call("POST", "/api/department/delete", {
        _id: currentDepartmentId,
      });
      const data = await call("GET", "/api/department/list");
      setDepartments(data.items);
      setModalOpen(false);
      toast.success("Department was successfully deleted.");
    } catch (error) {
      if (error) {
        toast.error("Department can not be deleted because there is employee.");
      }
      setModalOpen(false);
    }
  };

  const openModal = (departmentId) => {
    setCurrentDepartmentId(departmentId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {!error ? (
        <>
          <ToastContainer position="top-center" />
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {departments.map((department) => (
                <Table.Row key={department._id}>
                  <Table.Cell>
                    <Link
                      to={`/search?departmentId=${department._id}`}
                      color="teal"
                    >
                      {department.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button
                      color="teal"
                      icon
                      labelPosition="left"
                      onClick={() => openModal(department._id)}
                    >
                      <Icon name="trash" />
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <ModalAddDepartment
            open={openDepartmentModal}
            onClose={() => setOpenDepartmentModal(false)}
            onSuccess={handleAddDepartmentSuccess}
          />

          <Modal open={modalOpen} onClose={closeModal} size="small">
            <Modal.Header>Confirm Deletion</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete this department?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={closeModal} negative>
                No
              </Button>
              <Button onClick={handleDeleteDepartment} positive>
                Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </>
      ) : (
        <Error error={error} />
      )}
    </>
  );
};

export default DepartmentList;
