import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Segment } from "semantic-ui-react";
import { UserContext } from "../components/userContext";
import { useLogin } from "../helpers/authentication-helper";
import Error from "../components/Error";

const LoginForm = () => {
  const user = useContext(UserContext);
  const login = useLogin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user.token != null) {
      navigate("/");
    }
  }, [user, navigate]);

  function submit() {
    setLoading(true);
    setError(null);
    login(username, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        if (e?.data?.error?.code === "IncorrectPassword") {
          toast.error("Incorrect credentials.");
          return;
        }
        setError(e);
        throw e;
      });
  }

  return (
    <>
      <Form size="large" onSubmit={submit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Username"
            min={3}
            max={20}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            min={1}
            max={72}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            color="teal"
            fluid
            size="large"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </Segment>
      </Form>

      {error && <Error error={error} />}
    </>
  );
};

export default LoginForm;
