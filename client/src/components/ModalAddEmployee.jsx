import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Modal,
  Form,
  Button,
  FormField,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import Error from "./Error";

const ModalAddEmployee = () => {
  const call = useCall();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState(null);

  const departmentOptions = useMemo(() => {
    if (departments === null) return null;
    return departments.map((department) => {
      return { value: department._id, text: department.name };
    });
  }, [departments]);

  const reloadDepartments = useCallback(async () => {
    let response;
    try {
      response = await call(
        "GET",
        "/api/department/list?pageIndex=0&pageSize=1000",
      );
    } catch (e) {
      setError(e);
      throw e;
    }
    setDepartments(response.items);
  }, [call]);

  useEffect(() => {
    reloadDepartments();
  }, [reloadDepartments]);

  const handleOpen = () => {
    setOpen(true);
    setFirstName("");
    setLastName("");
    setDepartmentId("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleAddEmployee = async () => {
    try {
      await call("POST", "/api/employee/create", {
        departmentId,
        firstName,
        lastName,
      });
      setFirstName("");
      setLastName("");
      setDepartmentId("");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button color="teal" onClick={handleOpen}>
        Add Employee
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>Add Employee</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
            <Form.Input
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
            <FormField>
              <label>Department</label>
              <Dropdown
                onClick={reloadDepartments}
                placeholder="Department"
                name="departmentId"
                selection
                search
                options={departmentOptions}
                loading={departmentOptions === null}
                disabled={departmentOptions === null}
                value={departmentId}
                onChange={(e, { value }) => setDepartmentId(value)}
                required
              />
            </FormField>
          </Form>
          {error && <Error error={error} />}
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
