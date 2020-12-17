import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import React from 'react';
// import './App.css';
import "./myapp.css";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import ThankYou from "./components/LandingPage/ThankYou";
import CustomizedMenus from "./components/nav/menu.js";
import LandingPageMenu from "./components/LandingPage/LandingPageMenu.js";

import { ThemeProvider } from "@material-ui/styles";
import WishlistPage from "./components/wishlistpage/WishlistPage";
import EditWish from "./components/wishlistpage/PriceInput";

// import AddWish from "./components/wishlistpage/addwish1/AddWish.js";
import SignUp from "./components/SignUp/SignUp";
import SetUp from "./components/SetUp/SetUp";
// import './Styles/App.css';
import theme from "./theme";
import StyledDialog from "./components/common/StyledDialog/StyledDialog";
const currentUser = () => {
  return fetch("/users/current", {
    credentials: "include",
  }).then((res) => {
    if (res.status === 204) return Promise.resolve(null);
    return res.json();
  });
};
function App(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    currentUser().then((user) => {
      setUser(user);
    });
  }, []);
  // const user = {
  //   bannerPicUrl: "/images/banner_pic.png",
  //   profilePicUrl: "/images/profile_pic.png",
  //   displayName: "Brittany K.",
  //   name: { first: "Brittany", last: "Kochover" },
  //   profileMessage: "Love you guys <3",
  //   wishlistItems: [
  //     {
  //       itemName: "YSL Stilettos",
  //       price: "1000.00",
  //       imageUrl: "/images/heels.png",
  //     },
  //     {
  //       itemName: "Reformation Dress",
  //       price: "300.00",
  //       imageUrl: "/images/dress.png",
  //     },
  //     {
  //       itemName: "Night Pallette",
  //       price: "37.00",
  //       imageUrl: "/images/makeup.png",
  //     },
  //   ],
  // };
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
              path="/editwish"
              render={(props) => {
                return (
                  <StyledDialog open={true}>
                    <EditWish wishlist="5fcfc70ddd6d5626163bd202" />
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
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
