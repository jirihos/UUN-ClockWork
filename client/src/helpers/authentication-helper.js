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

    await userContext.reload();
  };
}

export function useLogout() {
  const userContext = useContext(UserContext);

  return async () => {
    localStorage.removeItem("token");

    await userContext.reload();
  };
}
