import React, { useState } from "react";
import { Modal, Form, Button } from "semantic-ui-react";

import "../css/modalAddEmployee.css";

const ModalAddEmployee = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Employee</Button>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>Add Employee</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input label="Name" />
            <Form.Input label="Department" />
          </Form>
        </Modal.Content>
        <Modal.Actions className="modal-actions">
          <Button color="teal">Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ModalAddEmployee;
