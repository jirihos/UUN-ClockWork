import React from "react";
import { Button, ButtonGroup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useLogout } from "../helpers/authentication-helper";

const Header = () => {
  const logout = useLogout();
  return (
    <div className="header-button-group">
      <ButtonGroup size="medium" floated="left" color="teal">
        <Button as={Link} to="/" primary>
          Dashboard
        </Button>
        <Button as={Link} to="/events" primary>
          Event Table
        </Button>
        <Button as={Link} to="/test" primary>
          Test Site
        </Button>
      </ButtonGroup>
      <ButtonGroup size="medium" floated="right">
        <Button onClick={logout}>Logout</Button>
      </ButtonGroup>
    </div>
  );
};

export default Header;
