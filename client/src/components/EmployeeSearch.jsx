import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  Dropdown,
  Form,
  FormField,
  FormGroup,
  Input,
} from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import EmployeeSearchResults from "./EmployeeSearchResults";

function getInitialFormData(searchParams) {
  return {
    departmentId: searchParams.get("departmentId") || "",
    firstName: searchParams.get("firstName") || "",
    lastName: searchParams.get("lastName") || "",
  };
}

const EmployeeSearch = () => {
  const call = useCall();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(getInitialFormData(searchParams));
  const [departments, setDepartments] = useState([]);

  const departmentOptions = useMemo(() => {
    return departments.map((department) => {
      return { value: department._id, text: department.name };
    });
  }, [departments]);

  const filter = useMemo(() => {
    const filter = {};
    for (const [key, value] of searchParams.entries()) {
      filter[key] = value;
    }
    return filter;
  }, [searchParams]);

  const reloadDepartments = useCallback(async () => {
    const response = await call(
      "GET",
      "/api/department/list?pageIndex=0&pageSize=1000",
    );
    setDepartments(response.items);
  }, [call]);

  useEffect(() => {
    reloadDepartments();
  }, [reloadDepartments]);

  function onChange(e, { name, value }) {
    setFormData({ ...formData, [name]: value });
  }

  function submit() {
    // copy non empty formData fields to a new object
    const paramsObj = {};
    for (const key in formData) {
      if (formData[key]) {
        paramsObj[key] = formData[key];
      }
    }

    setSearchParams(new URLSearchParams(paramsObj));
  }

  return (
    <div>
      <Form onSubmit={submit} style={{ marginBottom: 10 }}>
        <FormGroup style={{ rowGap: 6, justifyContent: "center" }}>
          <FormField>
            <Dropdown
              placeholder="Department"
              name="departmentId"
              selection
              search
              clearable
              options={departmentOptions}
              value={formData.departmentId}
              onChange={onChange}
            />
          </FormField>
          <FormField>
            <Input
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
            />
          </FormField>
          <FormField>
            <Input
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
            />
          </FormField>
          <Button type="submit" primary>
            Search
          </Button>
        </FormGroup>
      </Form>

      <EmployeeSearchResults filter={filter} departments={departments} />
    </div>
  );
};

export default EmployeeSearch;
