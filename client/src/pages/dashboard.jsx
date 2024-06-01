import { useState, useEffect } from "react";
import { useCall } from "../helpers/call-helper";
import {
  Menu,
  MenuItem,
  Input,
  Table,
  Segment,
  Button,
  Modal,
  Icon,
} from "semantic-ui-react";

import Header from "../components/header";
import ModalAddEmployee from "../components/modalAddEmployee";
import ModalAddDepartment from "../components/modalAddDepartment";
import PresentEmployeesList from "../components/PresentEmployeeList";


const Dashboard = () => {
  const call = useCall();
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeItem, setActiveItem] = useState("departmentList");
  const [openDepartmentModal, setOpenDepartmentModal] = useState(false);
  const [openUser, setOpenUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await call("GET", "/api/department/list");
        setDepartments(data.items);
      } catch (error) {
        console.error(error);
      }

      try {
        const data = await call("GET", "/api/employee/list");
        setUsers(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [call]);

  const handleItemClick = (e, { name }) => setActiveItem(name);

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
      <Header />
      <br />
      <h1>Dashboard</h1>
      <br />
      <div>
        <Menu pointing>
          <MenuItem
            name="departmentList"
            active={activeItem === "departmentList"}
            onClick={handleItemClick}
          >
            Department List
          </MenuItem>
          <MenuItem
            name="userList"
            active={activeItem === "userList"}
            onClick={handleItemClick}
          >
            Employee List
          </MenuItem>
        </Menu>
        <Segment>
          {activeItem === "departmentList" && (
            <>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {departments.map((department) => (
                    <Table.Row key={department._id}>
                      <Table.Cell>{department._id}</Table.Cell>
                      <Table.Cell>{department.name}</Table.Cell>
                      <Table.Cell textAlign="right">
                        <Button
                          onClick={() => handleDeleteDepartment(department._id)}
                        >
                          <Icon name="trash" />
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
          )}
          {activeItem === "userList" && (
            <>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Code</Table.HeaderCell>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {users.map((user) => (
                    <Table.Row key={user._id}>
                      <Table.Cell>{user._id}</Table.Cell>
                      <Table.Cell>{user.code}</Table.Cell>
                      <Table.Cell>{user.firstName}</Table.Cell>
                      <Table.Cell>{user.lastName}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <ModalAddEmployee
                open={openUser !== null}
                onClose={() => setOpenUser(null)}
                userId={openUser}
              />
            </>
          )}
        </Segment>

        <PresentEmployeesList />
      </div>
    </>
  );
};

export default Dashboard;
