import { useCallback, useContext } from "react";
import { useCall } from "./call-helper";
import { UserContext } from "../components/UserContext";

export function useLogin() {
  const userContext = useContext(UserContext);
  const call = useCall();

  return useCallback(
    async (username, password) => {
      const response = await call("POST", "/api/user/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.token);

      await userContext.reload();
    },
    [userContext, call],
  );
}

export function useLogout() {
  const userContext = useContext(UserContext);

  return useCallback(async () => {
    localStorage.removeItem("token");

    await userContext.reload();
  }, [userContext]);
}
