import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { CurrencyContext } from "./contexts/CurrencyContext";
import { LocaleContext } from "./contexts/LocaleContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import React from 'react';
// import './App.css';
import {
  clientCurrency,
  parsedCookies,
  chooseCurrency,
} from "./scripts/helpers";
import "./myapp.css";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import ThankYou from "./components/LandingPage/ThankYou";
import CustomizedMenus from "./components/nav/menu.js";
import LandingPageMenu from "./components/LandingPage/LandingPageMenu.js";

import { ThemeProvider } from "@material-ui/styles";
import WishlistPage from "./components/wishlistpage/WishlistPage";
import EditWishForm from "./components/wishlistpage/EditWishForm/EditWishForm";

// import AddWish from "./components/wishlistpage/addwish1/AddWish.js";
import SignUp from "./components/SignUp/SignUp";
import SetUp from "./components/SetUp/SetUp";
// import './Styles/App.css';
import theme from "./theme";
import StyledDialog from "./components/common/StyledDialog/StyledDialog";
const currentUser = async () => {
  let user = await fetch("/users/current", {
    credentials: "include",
  }).then((res) => {
    if (res.status === 204) return Promise.resolve(null);
    return res.json();
  });
  return user;
};

const currentSession = async () => {
  const session = await fetch("/sessions", {
    credentials: "include",
  }).then((res) => {
    if (res.status === 204) return Promise.resolve(null);
    return res.json();
  });
  return session;
};

function App(props) {
  const [user, setUser] = useState();

  const cookies = parsedCookies();

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
          <Switch>
            <Route path="/" exact>
              <LandingPageMenu />
            </Route>
            <Route path="/">
              <CustomizedMenus />
            </Route>
          </Switch>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => {
                return (
                  <div>
                    <LandingPage />
                  </div>
                );
              }}
            />
            <Route
              path="/betathankyou"
              exact
              render={(props) => {
                return (
                  <div>
                    <ThankYou />
                  </div>
                );
              }}
            />

            <Route
              path="/demo"
              exact
              render={(props) => {
                return (
                  <div>
                    <HomePage />
                  </div>
                );
              }}
            />
            <Route
              path="/sign-up"
              exact
              render={(props) => {
                return (
                  <div>
                    <SignUp />
                  </div>
                );
              }}
            />
            <Route
              path="/wishlist-setup"
              exact
              render={(props) => {
                return (
                  <div>
                    <SetUp />
                  </div>
                );
              }}
            />

            <Route
              path="/price"
              render={(props) => {
                return (
                  <StyledDialog open={true}>
                    <EditWishForm
                      info={{
                        price: "8000",
                        itemName: "Cereal",
                        itemImage:
                          "/data/images/itemImages/6d12a7f1-0b27-46e2-b6a5-a0806e73eadb.png",
                      }}
                      id="5fde866aae999a367d935820"
                      onClose={() => console.log("done")}
                    />
                  </StyledDialog>
                );
              }}
            />
            <Route
              path="/demo/wishlist"
              render={(props) => {
                return (
                  <div>
                    <WishlistPage user={user} />
                  </div>
                );
              }}
            />
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

export default App;
