import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import { origin } from "../helpers/call-helper";
import Error from "./Error";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [expirationNotificationSent, setExpirationNotificationSent] =
    useState(false);

  const reload = useCallback(async () => {
    let token = localStorage.getItem("token");
    let username = null;
    let role = null;

    if (token != null) {
      let response;
      try {
        response = await fetch(origin + "/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        setError(e);
        throw e;
      }

      if (response.status === 200) {
        const json = await response.json();
        username = json.username;
        role = json.role;

        setExpiresIn(json.expiresIn - 2000);
      } else {
        token = null;
        localStorage.removeItem("token");
      }
    }

    if (token == null) {
      setExpiresIn(null);
      navigate("/login");
    }

    setValue({
      token,
      username,
      role,
      reload,
    });
  }, [navigate]);

  // expiration timeouts
  useEffect(() => {
    if (expiresIn == null) return;

    const notificationTimeoutID = setTimeout(
      () => {
        if (expirationNotificationSent) return;
        toast.warn(
          "Your session expires in 3 minutes and you will be logged out.",
          { autoClose: 8000 },
        );
        setExpirationNotificationSent(true);
      },
      expiresIn - 1000 * 60 * 3, // 3 minutes before expiration
    );

    const logoutTimeoutID = setTimeout(() => {
      localStorage.removeItem("token");
      reload();
      toast.info("Your session expired.");
    }, expiresIn);

    return () => {
      clearTimeout(notificationTimeoutID);
      clearTimeout(logoutTimeoutID);
    };
  }, [expiresIn, expirationNotificationSent, reload]);

  useEffect(() => {
    reload();
  }, [reload]);

  if (value == null) {
    return (
      <>{!error ? <Loader active>Loading</Loader> : <Error error={error} />}</>
    );
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
