import { useParams } from "react-router-dom";
import Header from "../components/header";
import Employee from "../components/Employee"; // Import the Employee component
import EmployeeInfo from "../components/EmployeeInfo"; // Import the EmployeeInfo component
import "../css/employee.css";

const EmployeePage = () => {
  const { code } = useParams();

  return (
    <div className="container">
      <Header />
      <EmployeeInfo code={code} />
      <Employee code={code} />
    </div>
  );
};

export default EmployeePage;
