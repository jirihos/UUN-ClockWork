import { useContext } from "react";
import { UserContext } from "../components/userContext";

export const origin = new URL(import.meta.env.VITE_BACKEND_URL).origin;

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
    const contentType = response.headers.get("Content-Type").split(";")[0];
    let data;
    switch (contentType) {
      case "application/json":
        data = await response.json();
        break;
      case "text/csv":
        data = await response.blob();
        break;
      default:
        data = await response.text();
    }

    if (response.status < 200 || response.status > 399) {
      const err = new Error(response.statusText);
      err.response = response;
      err.data = data;
      throw err;
    }

    return data;
  };
}
