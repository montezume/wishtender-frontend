import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import FetchPage from "./fetchpage.js";
import NoFetchPage from "./nofetchpage.js";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Route
          path="/"
          render={(props) => {
            return (
              <div>
                Navigation: Home | Account | Logout
                <br />
                <br />
                <br />
              </div>
            );
          }}
        />
        {/* needs to render differently if not accessed from redirect */}
        <Switch>
          <Route
            path="/fetch"
            render={(props) => {
              return <FetchPage />;
            }}
          />
          <Route
            path="/cart1"
            render={(props) => {
              return <FetchPage />;
            }}
          />

          <Route
            path="/nofetch"
            render={(props) => {
              return <NoFetchPage />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
