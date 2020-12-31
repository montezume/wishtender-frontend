import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { SessionContext } from "./contexts/SessionContext";
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

// get country code
const getCountryCode = async () => {
  await fetch("https://extreme-ip-lookup.com/json/")
    .then((res) => res.json())
    .then((response) => {
      return response.countryCode;
    })
    .catch((data, status) => {
      console.log("Request failed");
    });
  return countryCode;
};
const postCountryCode = async () => {
  // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch("/session", {
    method: "PATCH",
    body: JSON.stringify({ countryCode }),
    headers,
  });
  return response;
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
const createSession = async () => {
  const countryCode = await getCountryCode();
  const session = await postCountryCode();
  return session;
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
