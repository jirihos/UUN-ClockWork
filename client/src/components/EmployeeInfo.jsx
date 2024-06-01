import { useEffect, useState } from "react";
import { useCall } from "../helpers/call-helper";
import "../css/employee.css";
import { Loader, Message, Button, Icon } from "semantic-ui-react";
import Error from "./Error";
import ModalAddEvent from "./ModalAddEvent";

const EmployeeInfo = ({ code, onEventAdded }) => {
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [departmentName, setDepartmentName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeNotFound, setEmployeeNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const call = useCall();

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        const response = await call(
          "GET",
          `/api/employee/findByCode?code=${code}`,
        );
        if (!response) {
          setEmployeeNotFound(true);
          setLoading(false);
          return;
        }
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

  const handleModalClose = () => {
    setModalOpen(false);
    if (onEventAdded) {
      onEventAdded();
    }
  };

  if (loading)
    return (
      <div style={{ margin: 30 }}>
        <Loader active inline="centered" />
      </div>
    );
  if (error)
    return (
      <div className="employee-info">
        <Message negative>
          <Message.Header>Employee Not Found</Message.Header>
          <p>
            No employee with the <strong>{code}</strong> was found.
          </p>
        </Message>
      </div>
    );

  return (
    <div className="employee-info">
      {employeeInfo && (
        <Message
          icon="user"
          header={`${employeeInfo.firstName} ${employeeInfo.lastName}`}
          content={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                Code: {employeeInfo.code}, Department: {departmentName || "N/A"}
              </span>
              <ModalAddEvent
                employeeCode={employeeInfo.code}
                onClose={handleModalClose}
              />
            </div>
          }
        />
      )}
    </div>
  );
};

export default EmployeeInfo;
