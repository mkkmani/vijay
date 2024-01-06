import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import Admin from "./components/Admin";
import ManageRoute from "./components/ManageRoute";

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/manage" component={ManageRoute} />
  </Switch>
);

export default App;
