import { Grid } from "semantic-ui-react";
import Header from "../components/Header";
import ModalAddEmployee from "../components/ModalAddEmployee";
import DepartmentList from "../components/DepartmentList";
import PresentEmployeesList from "../components/PresentEmployeeList";
import EmployeeSearchCode from "../components/EmployeeSearchCode";

const Dashboard = () => {
  return (
    <>
      <Header />

      <Grid stackable>
        <Grid.Row columns="equal">
          <Grid.Column>
            <EmployeeSearchCode />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <ModalAddEmployee />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} divided>
          <Grid.Column width={10}>
            {/* 2/3 of the screen */}
            <DepartmentList />
          </Grid.Column>
          <Grid.Column width={6}>
            {/* 1/3 of the screen */}
            <PresentEmployeesList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Dashboard;
