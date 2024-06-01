import { useEffect, useState } from "react";
import { useCall } from "../helpers/call-helper";
import "../css/employee.css";
import { Loader, Message } from "semantic-ui-react";
import Error from "./Error";

const EmployeeInfo = ({ code }) => {
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [departmentName, setDepartmentName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const call = useCall();

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        const response = await call(
          "GET",
          `/api/employee/findByCode?code=${code}`,
        );
        setEmployeeInfo(response);

        // Fetch department name
        if (response.departmentId) {
          const departmentResponse = await call(
            "GET",
            `/api/department/findById?_id=${response.departmentId}`,
          );
          setDepartmentName(departmentResponse.name);
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchEmployeeInfo();
  }, [code, call]);

  if (loading)
    return (
      <div style={{ magin: 30 }}>
        <Loader active inline="centered" />
      </div>
    );
  if (error) return <Error error={error} />;

  return (
    <div className="employee-info">
      {employeeInfo && (
        <Message
          icon="user"
          header={`${employeeInfo.firstName} ${employeeInfo.lastName}`}
          content={`Code: ${employeeInfo.code}, Department: ${departmentName || "N/A"}`}
        />
      )}
    </div>
  );
};

export default EmployeeInfo;
