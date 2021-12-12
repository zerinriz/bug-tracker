import React, { useState, useEffect } from "react";
import { create } from "./../bugs/api-bugs";
import { listUsers } from "./../user/api-user";
import { priorityOptions } from "./options";
import {
  Form,
  Input,
  Button,
  Dropdown,
  Header,
  Divider,
} from "semantic-ui-react";

function CreateBugs() {
  const [list, setList] = useState([]);
  var jsonStringObj = sessionStorage.getItem("token");
  var token = JSON.parse(jsonStringObj);
  const initialState = {
    creator: token.user.name,
    name: "",
    details: "",
    steps: "",
    priority: "",
    version: "",
    assigned: "",
    completed: "false",
    open: false,
    error: "",
  };

  const userOptions = list.map(function (value, label) {
    return { key: value.name, text: value.name, value: value.name };
  });

  const [values, setValues] = useState(initialState);
  useEffect(() => {
    listUsers().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setList(data);
      }
    });
  }, []);

  const clickSubmit = () => {
    const bugs = {
      creator: values.creator || undefined,
      name: values.name || undefined,
      details: values.details || undefined,
      steps: values.steps || undefined,
      priority: values.priority || undefined,
      version: values.version || undefined,
      assigned: values.assigned || undefined,
      completed: values.completed || undefined,
    };

    create(bugs).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangePriority = (event, { value }) =>
    setValues({ ...values, priority: value });

  const handleChangeAssigned = (event, { value }) =>
    setValues({ ...values, assigned: value });

  return (
    <Form
      style={{
        position: "inherit",
        height: "inherit",
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <Header as="h1">Create bug</Header>
      <Divider />
      <Form.Field>
        <label>Name</label>
        <Input
          onChange={handleChange("name")}
          value={values.name}
          placeholder="Name of the bug"
        >
          <input />
        </Input>
      </Form.Field>
      <Form.Field>
        <label>Details</label>
        <Input
          onChange={handleChange("details")}
          value={values.details}
          placeholder="Bug details"
        >
          <input />
        </Input>
      </Form.Field>
      <Form.Field>
        <label>Steps</label>
        <Input
          onChange={handleChange("steps")}
          value={values.steps}
          placeholder="Steps to reproduce the bug"
        >
          <input />
        </Input>
      </Form.Field>
      <Form.Field>
        <label>Priority</label>
        <Dropdown
          placeholder="Priority"
          fluid
          selection
          onChange={handleChangePriority}
          options={priorityOptions}
        />
      </Form.Field>
      <Form.Field>
        <label>Assigned</label>
        <Dropdown
          placeholder="Assigned"
          fluid
          selection
          onChange={handleChangeAssigned}
          options={userOptions}
        />
      </Form.Field>
      <Form.Field>
        <label>Application version</label>
        <Input
          value={values.version}
          onChange={handleChange("version")}
          placeholder="Version"
        >
          <input />
        </Input>
      </Form.Field>
      <Form.Field>
        <Divider style={{ marginTop: "10%" }} />
        <Button
          onClick={() => {
            clickSubmit();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }}
        >
          Create bug
        </Button>
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
      </Form.Field>
    </Form>
  );
}

export default CreateBugs;
