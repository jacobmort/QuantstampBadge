import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import StartAudit from "./start-audit/StartAudit.js";

class App extends Component {
  render() {
    return (<Router>
      <Switch>
        <Route exact path="/" render={props => (
          <h2>hello world {{ props }}</h2>
        )} />
        <Route path="/start-audit" component={StartAudit} />
      </Switch>
    </Router>)
  }
}

export default App;
