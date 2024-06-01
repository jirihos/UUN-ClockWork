import { useParams } from "react-router-dom";
import Header from "../components/header";
import EmployeeEvents from "../components/EmployeeEvents";
import EmployeeInfo from "../components/EmployeeInfo";
import "../css/employee.css";

const EmployeePage = () => {
  const { code } = useParams();

  return (
    <div className="container">
      <Header />
      <EmployeeInfo code={code} />
      <EmployeeEvents code={code} />
    </div>
  );
};

export default EmployeePage;
