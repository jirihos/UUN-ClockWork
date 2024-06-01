import { useState } from "react";
import { Button, Dropdown, Form, Icon, Modal } from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import Error from "./Error";

const ModalAddEvent = ({ employeeCode, onClose }) => {
  const call = useCall();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("arrival");
  const [timestampString, setTimestampString] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  async function onSubmit(e) {
    try {
      await call("POST", "/api/event/create", {
        employeeCode,
        type,
        timestamp: new Date(timestampString),
      });
    } catch (e) {
      setError(e);
      throw e;
    }
    handleClose();
  }

  return (
    <div>
      <Button color="teal" onClick={handleOpen}>
        <Icon name="plus" /> Add Event
      </Button>
      <Modal open={open} onClose={handleClose} size="tiny">
        <Modal.Header>Add Event</Modal.Header>
        <Modal.Content>
          <Form id="ModalAddEventForm" onSubmit={onSubmit}>
            <Form.Group>
              <Form.Field>
                <label>Type</label>
                <Dropdown
                  selection
                  options={[
                    { value: "arrival", text: "Arrival" },
                    { value: "leave", text: "Leave" },
                  ]}
                  value={type}
                  onChange={(e, { value }) => setType(value)}
                  required
                ></Dropdown>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Timestamp"
                type="datetime-local"
                value={timestampString}
                onChange={(e) => setTimestampString(e.target.value)}
                required
              ></Form.Input>
            </Form.Group>
          </Form>
          {error && <Error error={error} />}
        </Modal.Content>
        <Modal.Actions>
          <Button color="teal" type="submit" form="ModalAddEventForm">
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

export default ModalAddEvent;
