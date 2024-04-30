import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);

  function reload() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reload, []);

  if (value == null) {
    return null;
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
