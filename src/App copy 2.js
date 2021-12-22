import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LiveStorePurchases from "./LiveStorePurchases";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/livePurchases/:storeId">
            <LiveStorePurchases />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
