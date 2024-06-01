import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Image, Menu, MenuItem } from "semantic-ui-react";
import { useLogout } from "../helpers/authentication-helper";
import { UserContext } from "./UserContext";
import Logo from "../assets/ClockWork_Logo.png";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const logout = useLogout();

  return (
    <Menu stackable>
      <MenuItem header>
        <Image
          src={Logo} // TODO logo
          style={{
            width: "90px",
            height: "45px",
            marginRight: "5px",
          }}
        ></Image>
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
