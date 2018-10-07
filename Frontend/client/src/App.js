import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import StartAudit from "./start-audit/StartAudit.js";

class App extends Component {
  render() {
    return (<Router>
      <Switch>
        <Route path="/start-audit/:githubUser/:repo" component={StartAudit} />
        <Route path="/" render={props => (
          <h2>hello world</h2>
        )} />
      </Switch>
    </Router>)
  }
}

export default App;
