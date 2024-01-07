import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/Homepage";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import ManageRoute from "./components/ManageRoute";

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/manage" component={ManageRoute} />
      <Route exact path="/contact" component={Contact} />
    </Switch>
  </div>
);

export default App;
