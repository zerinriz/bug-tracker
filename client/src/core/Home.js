/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { read } from "./../user/api-user";
import { Grid, Menu, Segment, Container, Button } from "semantic-ui-react";
import Dashboard from "./Dashboard";
import ViewBugs from "./ViewBugs";
import CreateBugs from "./CreateBugs";
import auth from "./../auth/auth.helper";

function Home({ match }) {
  const [state, setState] = useState({ activeItem: "Dashboard" });
  const [values, setValues] = useState({
    role: "",
  });
  const { activeItem } = state;
  const jwt = auth.isAuthenticated();
  const handleItemClick = (e, { name }) => setState({ activeItem: name });
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, role: data.role });
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const buffer = [];
  if (state.activeItem === "Dashboard") {
    buffer.push([<Dashboard key={1} setState={setState} />]);
  } else if (state.activeItem === "View Bugs") {
    buffer.push([<ViewBugs key={2} />]);
  } else if (state.activeItem === "Create Bug") {
    buffer.push([<CreateBugs key={3} />]);
  }
  return (
    <Container
      style={{
        height: "80%",
        border: "solid 2px",
        textAlign: "center",
        position: "inherit",
        top: "10%",
        left: "auto",
      }}
    >
      <Grid
        style={{
          height: "-webkit-fill-available",
          position: "initial",
          margin: "auto",
        }}
      >
        <Grid.Column
          width={5}
          style={{ height: "inherit", position: "relative" }}
        >
          <Menu
            fluid
            vertical
            tabular
            style={{
              position: "inherit",
              height: "-webkit-fill-available",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Menu.Item
                name="Dashboard"
                active={activeItem === "Dashboard"}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="View Bugs"
                active={activeItem === "View Bugs"}
                onClick={handleItemClick}
              />
              {values.role === "admin" && (
                <Menu.Item
                  name="Create Bug"
                  active={activeItem === "Create Bug"}
                  onClick={handleItemClick}
                />
              )}
            </div>
            <br />
            <Button
              style={{
                textAlign: "center",
                position: "absolute",
                bottom: "10px",
                left: "50%",
                WebkitTransform: "translateX(-50%)",
                MozTransform: "translateX(-50%)",
                transform: "translateX(-50%)",
              }}
              onClick={() => {
                auth.clearJWT();
                window.location.reload();
              }}
            >
              Logout
            </Button>
          </Menu>
        </Grid.Column>
        <Grid.Column
          style={{
            position: "inherit",
            height: "inherit",
          }}
          stretched
          width={11}
        >
          <Segment
            style={{
              overflow: "auto",
              maxHeight: "100%",
              position: "inherit",
              height: "inherit",
            }}
          >
            {buffer}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Home;
