import { useState } from "react";
import { useLogout } from "../helpers/authentication-helper";
import { useCall } from "../helpers/call-helper";
import { Button } from "semantic-ui-react";

const Dashboard = () => {
  const logout = useLogout();
  const call = useCall();

  const [example, setExample] = useState();
  function loadExample() {
    call("GET", "/api/department/list").then((data) => setExample(data));
  }

  return (
    <>
      <h1>Dashboard</h1>
      <Button onClick={logout}>Logout</Button>
      <br />
      <br />
      <br />
      <Button onClick={loadExample}>Load example</Button>
      <br />
      {JSON.stringify(example)}
    </>
  );
};

export default Dashboard;
