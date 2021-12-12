import React, { useState } from "react";
import { Button, Icon, Modal, Form, Input, Radio } from "semantic-ui-react";
import { create } from "../user/api-user";

function Register() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    role: "",
    open: false,
    error: "",
  });

  const handleChangeRole = (event, { value }) =>
    setValues({ ...values, role: value });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      role: values.role || undefined,
      password: values.password || undefined,
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
        setSecondOpen(true);
      }
    });
  };

  return (
    <>
      <Button
        size="small"
        circular
        style={{ position: "inherit", top: "-3px" }}
        color="blue"
        onClick={() => setFirstOpen(true)}
      >
        Register
      </Button>
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>Register form</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Field>
                <label>Name</label>
                <Input
                  onChange={handleChange("name")}
                  value={values.name}
                  iconPosition="left"
                  placeholder="Username"
                >
                  <Icon name="user" />
                  <input />
                </Input>
              </Form.Field>
              <Form.Field>
                <label>E-mail</label>
                <Input
                  type="email"
                  value={values.email}
                  onChange={handleChange("email")}
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
                  type="password"
                  value={values.password}
                  onChange={handleChange("password")}
                  iconPosition="left"
                  placeholder="Password"
                >
                  <Icon name="lock" />
                  <input />
                </Input>
              </Form.Field>

              <Form.Field style={{ position: "relative" }}>
                {values.error && (
                  <h3
                    style={{
                      position: "inherit",
                      textAlign: "center",
                    }}
                  >
                    {values.error}
                  </h3>
                )}
                <Radio
                  label="Admin"
                  name="radioGroup"
                  value={"admin"}
                  checked={values.role === "admin"}
                  onChange={handleChangeRole}
                />
                <Radio
                  style={{ marginLeft: "5%" }}
                  label="User"
                  name="radioGroup"
                  value={"user"}
                  checked={values.role === "user"}
                  onChange={handleChangeRole}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              clickSubmit();
              setTimeout(() => {
                setSecondOpen(false);
              }, 1500);
            }}
            primary
          >
            Register <Icon name="right chevron" />
          </Button>
        </Modal.Actions>

        <Modal
          onUnmount={() => {
            setFirstOpen(false);
            setValues("");
            setSecondOpen(false);
          }}
          open={secondOpen}
          size="small"
        >
          <Modal.Content style={{ textAlign: "center" }}>
            <h1>You are successfully registered</h1>
          </Modal.Content>
        </Modal>
      </Modal>
    </>
  );
}

export default Register;
