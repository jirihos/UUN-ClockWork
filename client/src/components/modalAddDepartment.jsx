import React, { useState } from "react";
import { Modal, Form, Button, Icon } from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";

const ModalAddDepartment = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const call = useCall();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handleAddDepartment = async () => {
    try {
      await call("POST", "/api/department/create", {
        name,
      });
      setName("");
      setOpen(false);
    } catch (error) {
      console.error(error);
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
          <Form>
            <Form.Input label="Name" value={name} onChange={handleNameChange} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="teal" onClick={handleAddDepartment}>
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
