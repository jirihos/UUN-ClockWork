import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../helpers/authentication-helper";
import { UserContext } from "../components/userContext";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

function LoginForm() {
  const user = useContext(UserContext);
  const login = useLogin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user.token != null) {
      navigate("/");
    }
  }, [user, navigate]);

  function submit() {
    setLoading(true);
    login(username, password)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
        // TODO: handle error
      });
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Sign in to your account
        </Header>
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
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;
