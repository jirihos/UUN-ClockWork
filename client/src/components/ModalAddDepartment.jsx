import { useState } from "react";
import { Modal, Form, Button, Icon } from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import Error from "./Error";

const ModalAddDepartment = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const call = useCall();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setName("");
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handleAddDepartment = async () => {
    try {
      const newDepartment = await call("POST", "/api/department/create", {
        name,
      });
      setName("");
      setOpen(false);
      onSuccess(newDepartment);
    } catch (error) {
      setError(error);
      throw error;
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
          <Form id="ModalAddDepartmentForm" onSubmit={handleAddDepartment}>
            <Form.Input
              label="Name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Form>
          {error && <Error error={error} />}
        </Modal.Content>
        <Modal.Actions>
          <Button color="teal" type="submit" form="ModalAddDepartmentForm">
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
