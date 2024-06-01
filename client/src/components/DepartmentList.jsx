import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Icon } from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import ModalAddDepartment from "./ModalAddDepartment";
import Error from "./Error";

const DepartmentList = () => {
  const call = useCall();
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [openDepartmentModal, setOpenDepartmentModal] = useState(false);

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

  const handleDeleteDepartment = async (departmentId) => {
    try {
      await call("POST", "/api/department/delete", { _id: departmentId });
      const data = await call("GET", "/api/department/list");
      setDepartments(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!error ? (
        <>
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
                      onClick={() => handleDeleteDepartment(department._id)}
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
        </>
      ) : (
        <Error error={error} />
      )}
    </>
  );
};

export default DepartmentList;
