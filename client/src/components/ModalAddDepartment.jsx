import React, { useState } from "react";
import { Modal, Form, Button, Icon, Message } from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";

const ModalAddDepartment = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const call = useCall();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setName("");
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handleAddDepartment = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    try {
      const newDepartment = await call("POST", "/api/department/create", {
        name,
      });
      setName("");
      setOpen(false);
      onSuccess(newDepartment);
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <div>
      <Button color="teal" onClick={handleOpen}>
        <Icon name="plus" /> Add Department
      </Button>
      <Modal open={open} onClose={handleClose} size="tiny">
        <Modal.Header>Add Department</Modal.Header>
        <Modal.Content>
          {error && <Message error content={error} />}
          <Form onSubmit={handleAddDepartment}>
            <Form.Input
              label="Name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" color="teal" onClick={handleAddDepartment}>
            <Icon name="check" /> Add
          </Button>
          <Button onClick={handleClose}>
            <Icon name="close" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ModalAddDepartment;
