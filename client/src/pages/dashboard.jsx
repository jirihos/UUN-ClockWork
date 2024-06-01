import Header from "../components/header";
import ModalAddEmployee from "../components/modalAddEmployeee";
import DepartmentList from "../components/DepartmentList";
import PresentEmployeesList from "../components/PresentEmployeeList";

const Dashboard = () => {
  return (
    <>
      <Header />

      <ModalAddEmployee />
      <DepartmentList />
      <PresentEmployeesList />
    </>
  );
};

export default Dashboard;
