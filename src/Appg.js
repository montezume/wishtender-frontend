import OBSPlugin from "./components/OBS/OBSPlugin";

import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/stream/:alias">
            <OBSPlugin />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
