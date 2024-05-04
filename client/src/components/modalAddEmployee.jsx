import React, { useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";

import "../css/modalAddEmployee.css";

const ModalAddEmployee = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const call = useCall();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleDepartmentIdChange = (e) => setDepartmentId(e.target.value);

  const handleAddEmployee = async () => {
    try {
      await call("POST", "/api/employee/create", {
        departmentId,
        firstName: name,
        lastName,
      });
      setName("");
      setLastName("");
      setDepartmentId("");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Employee</Button>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>Add Employee</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="First Name"
              value={name}
              onChange={handleNameChange}
            />
            <Form.Input
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
            />
            <Form.Input
              label="Department Id"
              value={departmentId}
              onChange={handleDepartmentIdChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions className="modal-actions">
          <Button color="teal" onClick={handleAddEmployee}>
            Add
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ModalAddEmployee;
