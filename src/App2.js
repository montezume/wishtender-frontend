import React, { useState, useEffect, memo } from "react";
import { UserContext } from "./contexts/UserContext";
import { CurrencyContext } from "./contexts/CurrencyContext";
import { LocaleContext } from "./contexts/LocaleContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useTraceUpdate from "./scripts/useTraceUpdate";
import {
  clientCurrency,
  parsedCookies,
  chooseCurrency,
} from "./scripts/helpers";
import "./myapp.css";

import CustomizedMenus from "./components/nav/menu.js";

import { ThemeProvider } from "@material-ui/styles";
import WishlistPage from "./components/wishlistpage/WishlistPage";

import theme from "./theme";
const currentUser = async () => {
  let user = await fetch("/users/current", {
    credentials: "include",
  }).then((res) => {
    if (res.status === 204) return Promise.resolve(null);
    return res.json();
  });
  return user;
};

function App(props) {
  const [user, setUser] = useState();

  const cookies = parsedCookies();
  useTraceUpdate(App.name, props, { user });

  useEffect(() => {
    currentUser().then((user) => {
      setUser(user);
      if (!clientCurrency(user)) {
        chooseCurrency(JSON.parse(parsedCookies().locale));
      }
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Route path="/">
            <CustomizedMenus />
          </Route>
          <Switch>
            <LocaleContext.Provider value={JSON.parse(cookies.locale).locale}>
              <CurrencyContext.Provider value={clientCurrency(user)}>
                <UserContext.Provider value={user}>
                  <Route
                    path="/:alias"
                    render={(props) => {
                      return (
                        <div>
                          <WishlistPage />
                        </div>
                      );
                    }}
                  />
                </UserContext.Provider>
              </CurrencyContext.Provider>
            </LocaleContext.Provider>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

App.whyDidYouRender = true;

export default memo(App, (prevProps, nextProps) => {
  console.log("from memo: ", prevProps, nextProps);
  return nextProps.count === prevProps.count;
});
