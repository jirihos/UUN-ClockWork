import { useContext } from "react";
import { useCall } from "./call-helper";
import { UserContext } from "../components/userContext";

export function useLogin() {
  const userContext = useContext(UserContext);
  const call = useCall();

  return async (username, password) => {
    const response = await call("POST", "/api/user/login", {
      username,
      password,
    });

    localStorage.setItem("token", response.token);
    localStorage.setItem("username", response.username);
    localStorage.setItem("role", response.role);

    userContext.reload();
  };
}

export function useLogout() {
  const userContext = useContext(UserContext);

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    userContext.reload();
  };
}
