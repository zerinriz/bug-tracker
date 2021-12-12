/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import moment from "moment";
import { update } from "../bugs/api-bugs";
import {
  Modal,
  Button,
  Form,
  Input,
  Header,
  Dropdown,
  Icon,
} from "semantic-ui-react";
import { priorityOptions } from "./options";
import { removeBug, read } from "./../bugs/api-bugs";
import auth from "./../auth/auth.helper";
import EditBug from "./EditBug";

function SingleBug({ show, setShow, id }) {
  var buffer = [];
  const initialState = {
    creator: "",
    name: "",
    details: "",
    steps: "",
    priority: "",
    version: "",
    assigned: "",
    open: false,
    error: "",
  };
  const [values, setValues] = useState(initialState);
  const [secondOpen, setSecondOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  if (values.completed === true) {
    buffer.push(<Icon key={id} className="check square icon" />);
  }
  useEffect(() => {
    if (id === null) {
      return null;
    } else {
      const abortController = new AbortController();
      const signal = abortController.signal;
      read({ id }, { t: jwt.token }, signal).then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            details: data.details,
            steps: data.steps,
            priority: data.priority,
            version: data.version,
            creator: data.creator,
            created: data.created,
            assigned: data.assigned,
            completed: data.completed,
          });
        }
      });
      return function cleanup() {
        abortController.abort();
      };
    }
  }, [id]);

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const bugs = {
      completed: "true" || undefined,
    };
    console.log(bugs);
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

  const deleteAddress = () => {
    removeBug(id);
  };

  return (
    <>
      <Modal
        onClose={() => setShow(false)}
        onOpen={() => setShow(true)}
        open={show}
      >
        <Modal.Header style={{ position: "relative" }}>
          <Header textAlign="center" as="h1">
            {values.name}
            <span> {buffer}</span>
          </Header>

          <Button
            style={{ position: "absolute", top: "10px", left: "10px" }}
            onClick={() => {
              deleteAddress();
              setTimeout(() => {
                window.location.reload();
                setShow(false);
              }, 500);
            }}
            circular
            primary
          >
            Delete
          </Button>

          <Button
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() => {
              setShow(false);
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
                <label>Details</label>
                <Input value={values.details} placeholder="Bug details">
                  <input disabled />
                </Input>
              </Form.Field>
              <Form.Field>
                <label>Steps</label>
                <Input
                  value={values.steps}
                  placeholder="Steps to reproduce the bug"
                >
                  <input disabled />
                </Input>
              </Form.Field>
              <Form.Field>
                <label>Priority</label>
                <Dropdown
                  placeholder="Priority"
                  fluid
                  selection
                  value={values.priority}
                  options={priorityOptions}
                  disabled
                />
              </Form.Field>
              <Form.Field>
                <label>Creator</label>
                <Input value={values.creator} placeholder="Bug details">
                  <input disabled />
                </Input>
              </Form.Field>
              <Form.Field>
                <label>Application version</label>
                <Input value={values.version} placeholder="Version">
                  <input disabled />
                </Input>
              </Form.Field>
              <Form.Field>
                <label>Time</label>
                <Input
                  value={moment(values.created).format("DD/MM/YYYY, h:mm:ss")}
                  placeholder="Time when bug was created"
                >
                  <input disabled />
                </Input>
              </Form.Field>
              <br />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setSecondOpen(true);
              setShow(false);
            }}
            primary
            circular
          >
            Edit
          </Button>
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
            Mark Complete
          </Button>
        </Modal.Actions>
      </Modal>
      <EditBug
        secondOpen={secondOpen}
        setSecondOpen={setSecondOpen}
        values={values}
        id={id}
        setValues={setValues}
      />
    </>
  );
}

export default SingleBug;
