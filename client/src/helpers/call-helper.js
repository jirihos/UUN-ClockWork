import { useContext } from "react";
import { UserContext } from "../components/userContext";

const origin = new URL(import.meta.env.VITE_BACKEND_URL).origin;

export function useCall() {
  const { token } = useContext(UserContext);

  return async (method, path, body) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(origin + path, options);
    return await response.json();
  };
}
