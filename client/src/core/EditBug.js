/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { listUsers } from "./../user/api-user";
import { update } from "../bugs/api-bugs";
import auth from "./../auth/auth.helper";
import {
  Modal,
  Button,
  Form,
  Input,
  Header,
  Dropdown,
} from "semantic-ui-react";
import { priorityOptions } from "./options";

function EditBug({ secondOpen, setSecondOpen, values, setValues, id }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    listUsers().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setList(data);
      }
    });
  }, []);
  const userOptions = list.map(function (value, label) {
    return { key: value.name, text: value.name, value: value.name };
  });

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const bugs = {
      name: values.name || undefined,
      details: values.details || undefined,
      steps: values.steps || undefined,
      priority: values.priority || undefined,
      assigned: values.assigned || undefined,
      version: values.version || undefined,
    };
    update(
      {
        id,
      },
      {
        t: jwt.token,
      },
      bugs
    ).then((data) => {
      console.log(data);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
        console.log(values);
      } else {
        console.log(data);
        setValues({ ...values, redirectToProfile: true });
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
    <>
      <Modal
        onClose={() => setSecondOpen(false)}
        onOpen={() => setSecondOpen(true)}
        open={secondOpen}
      >
        <Modal.Header style={{ position: "relative" }}>
          <Header textAlign="center" as="h1">
            Edit Bug
          </Header>
          <Button
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() => {
              setSecondOpen(false);
            }}
            primary
            circular
          >
            Close
          </Button>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form
              style={{
                position: "inherit",
                height: "inherit",
              }}
              onSubmit={(e) => e.preventDefault()}
            >
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
                  value={values.priority}
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
                  value={values.assigned}
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
              <br />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              clickSubmit();
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }}
            primary
            circular
          >
            Edit Bug
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default EditBug;
