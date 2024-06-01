import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import EmployeeEvents from "../components/EmployeeEvents";
import EmployeeInfo from "../components/EmployeeInfo";
import "../css/employee.css";

const EmployeePage = () => {
  const { code } = useParams();
  const [eventKey, setEventKey] = useState(0);

  const handleEventAdded = () => {
    setEventKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="container">
      <Header />
      <EmployeeInfo code={code} onEventAdded={handleEventAdded} />
      <EmployeeEvents key={eventKey} code={code} />
    </div>
  );
};

export default EmployeePage;
