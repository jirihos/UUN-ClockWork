import React, { useState } from "react";
import { Button, Dropdown, Form, Icon, Modal } from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import Error from "./Error";

const ModalAddEvent = ({ employeeCode }) => {
  const call = useCall();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("arrival");
  const [timestampString, setTimestampString] = useState("");
  const formRef = React.createRef();

  console.log(timestampString);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function onSubmit(e) {
    e.preventDefault();
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

  function submitForm() {
    // TODO validation doesn't trigger
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true }),
    );
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <Icon name="plus" /> Add Event
      </Button>
      <Modal open={open} onClose={handleClose} size="tiny">
        <Modal.Header>Add Event</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit} ref={formRef}>
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
          <Button color="teal" onClick={submitForm}>
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
