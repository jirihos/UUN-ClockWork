import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { origin } from "../helpers/call-helper";
import { Loader } from "semantic-ui-react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);

  async function reload() {
    let token = localStorage.getItem("token");
    let username = null;
    let role = null;

    if (token != null) {
      const response = await fetch(origin + "/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const json = await response.json();
        username = json.username;
        role = json.role;
      } else {
        token = null;
        localStorage.removeItem("token");
      }
    }

    if (token == null) {
      navigate("/login");
    }

    setValue({
      token,
      username,
      role,
      reload,
    });
  }

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (value == null) {
    return <Loader active>Loading</Loader>;
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
