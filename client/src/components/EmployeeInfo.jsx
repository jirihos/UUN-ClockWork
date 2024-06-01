import { useEffect, useState } from "react";
import { useCall } from "../helpers/call-helper";
import "../css/employee.css";

const EmployeeInfo = ({ code }) => {
  const [employeeInfo, setEmployeeInfo] = useState(null);
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
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchEmployeeInfo();
  }, [code, call]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error)
    return <div className="error">Error loading data: {error.message}</div>;

  return (
    <div className="employee-info">
      {employeeInfo && (
        <>
          <h2>
            {employeeInfo.firstName} {employeeInfo.lastName}
          </h2>
          <p>Department ID: {employeeInfo.departmentId}</p>
        </>
      )}
    </div>
  );
};

export default EmployeeInfo;
