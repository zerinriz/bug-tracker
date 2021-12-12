import React, { useState } from "react";
import { signin } from "./api-auth";
import auth from "./auth.helper";
import { Redirect  } from "react-router-dom";
import {
  Container,
  Input,
  Icon,
  Form,
  Button,
  Header,
} from "semantic-ui-react";
import Register from "../auth/Register";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect  to={"/user/" + auth.isAuthenticated().user._id} />;
  }

  return (
    <Container
      style={{
        width: "40%",
        textAlign: "center",
        position: "inherit",
        top: "20%",
        left: "auto",
      }}
    >
      <Form>
        <Form.Field>
          <label>E-mail</label>
          <Input
            value={values.email}
            onChange={handleChange("email")}
            type="email"
            iconPosition="left"
            placeholder="E-mail"
          >
            <Icon name="at" />
            <input />
          </Input>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            value={values.password}
            onChange={handleChange("password")}
            type="password"
            iconPosition="left"
            placeholder="Password"
          >
            <Icon name="lock" />
            <input />
          </Input>
        </Form.Field>
        <Button
          onClick={clickSubmit}
          size="medium"
          type="submit"
          circular
          color="blue"
        >
          Submit
        </Button>
        {values.error && <Header>{values.error}</Header>}
        <br />
        <Header as="h2" style={{ position: "relative" }}>
          No account, <Register /> here.
        </Header>
      </Form>
    </Container>
  );
}

export default Login;
