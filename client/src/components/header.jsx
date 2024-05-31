import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Image, Menu, MenuItem } from "semantic-ui-react";
import { useLogout } from "../helpers/authentication-helper";
import { UserContext } from "./userContext";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const logout = useLogout();

  return (
    <Menu stackable>
      <MenuItem header>
        <Image
          src="https://placehold.co/50x40" // TODO logo
          style={{ marginRight: 5 }}
        ></Image>
        ClockWork
      </MenuItem>
      <MenuItem
        name="dashboard"
        active={pathname === "/"}
        onClick={() => {
          navigate("/");
        }}
      />
      <MenuItem
        name="search"
        active={pathname === "/search"}
        onClick={() => {
          navigate("/search");
        }}
      />
      <MenuItem
        name="export"
        active={pathname === "/export"}
        onClick={() => {
          navigate("/export");
        }}
      />

      <MenuItem position="right">
        <span style={{ marginRight: 12 }}>
          Logged in as <b>{user.username}</b>
        </span>
        <Button onClick={logout}>Logout</Button>
      </MenuItem>
    </Menu>
  );
};

export default Header;
