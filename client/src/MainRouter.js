import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./core/Home";
import PrivateRoute from "./user/PrivateRoute";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/user/:userId" component={Home} />
      </Switch>
    </>
  );
};

export default MainRouter;
