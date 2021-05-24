import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { RouteContext } from "./contexts/RouteContext";

import { CurrencyContext } from "./contexts/CurrencyContext";
import { CountryContext } from "./contexts/CountryContext";
import { LocaleContext } from "./contexts/LocaleContext";
import { NotificationContext } from "./contexts/NotificationContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import useTraceUpdate from "./scripts/useTraceUpdate";
// import React from 'react';k
// import './App.css';
import {
  clientCurrency,
  parsedCookies,
  chooseCurrency,
  getCurrencyList,
} from "./scripts/helpers";
import "./myapp.css";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import ThankYou from "./components/LandingPage/ThankYou";
import Menu from "./components/nav/Menu/Menu.js";
import Cart from "./components/Cart/Cart.js";
import Login from "./components/Login/Login.js";
import Logout from "./components/nav/LogoutButton/LogoutButton.js";
import WishTracker from "./components/WishTracker/WishTracker.js";
import ConfirmationEmail from "./components/Onboard/ConfirmationEmail/ConfirmationEmail";
import ConfirmEmail from "./components/Onboard/ConfirmEmail/ConfirmEmail";

import { ThemeProvider } from "@material-ui/styles";
import WishlistPage from "./components/WishlistPage/WishlistPage";

// import AddWish from "./components/wishlistpage/addwish1/AddWish.js";
import SignUp from "./components/Onboard/SignUp/SignUp";
import SetUp from "./components/Onboard/SetUp/SetUp";
// import './Styles/App.css';
import theme from "./theme";
import CheckOutSuccess from "./components/CheckOutSuccess/CheckOutSuccess";
// import WishForm from "./components/wishlistpage/AddWish/WishForm/WishForm";
import ConnectSuccess from "./components/ConnectSuccess/ConnectSucess";
import { CssBaseline, Dialog } from "@material-ui/core";
import StyledDialog from "./components/common/StyledDialog/StyledDialog";
import StyledDialog1 from "./components/common/StyledDialog/StyledDialog1";
import CurrencyOptions from "./components/SelectCurrencyForm/SelectCurrencyForm";
import SelectCurrencyForm from "./components/SelectCurrencyForm/SelectCurrencyForm";
import AddToCart from "./components/WishlistPage/AddToCart/AddToCart";
import EditWishForm from "./components/WishlistPage/EditWishForm/EditWishForm";
import AddWish from "./components/WishlistPage/AddWish/AddWish";
import UpdateProfileForm from "./components/WishlistPage/ProfileSection/UpdateProfileInfo/UpdateProfileForm/UpdateProfileForm";

function App(props) {
  const { getUser } = useContext(UserContext);
  const { getCurrencyCookie, setCurrencyCookie, setCurrencyCookieAndContext } =
    useContext(CurrencyContext);

  const [user, setUser] = useState();
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState(null);
  const [currencyNeeded, setCurrencyNeeded] = useState(false);
  const { getNotifications } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState();
  const [isCurrentUsersProfile, setIsCurrentUsersProfile] = useState();
  const cookies = parsedCookies();
  useTraceUpdate(App.name, props, { user });
  useEffect(() => {
    getUser().then((user) => {
      if (user && user?.currency) {
        setCurrency(user.currency);
      }
      if ((!user || !user?.currency) && parsedCookies().currency) {
        setCurrency(getCurrencyCookie());
      }
      setUser(user);
      const currencies = getCurrencyList(JSON.parse(parsedCookies().locale));
      setCurrencyList(currencies);
      if (currencyNeeded) {
        // const currencies = getCurrencyList(JSON.parse(parsedCookies().locale));
        // setCurrencyList(currencies);
        // chooseCurrency(JSON.parse(parsedCookies().locale));
      }
    });
  }, [currency, currencyNeeded, getUser]);

  useEffect(() => {
    if (!user) return;
    getNotifications(user.aliases[0]).then((notifications) => {
      setNotifications(notifications);
    });
  }, [user, getNotifications]);
  const SwitchRoutes = (
    <Switch>
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
        path="/demo/wishlist"
        render={(props) => {
          return (
            <div>
              <WishlistPage user={user} />
            </div>
          );
        }}
      />
      <Route path="/add-to-cart">
        {/* <StyledDialog open={true}> */}
        <AddToCart
          onClose={props.onClose}
          open={true}
          item={{
            itemImage:
              "https://wishtender.s3.amazonaws.com/images/profileImages/2716d359-fd4e-43ed-ab4d-174664d2da0f.png",
          }}
        />
        {/* </StyledDialog> */}
      </Route>
      <Route
        path="/add-to-cart2"
        render={(props) => {
          return (
            <StyledDialog1
              background="url(/images/background_bow_confetti-sm_optimized.png)"
              background_xs="url(/images/background_bow_confetti_xs_optimized.png)"
              onClose={props.onClose}
              open={true}
            >
              <AddToCart
                item={{
                  itemImage:
                    "https://wishtender.s3.amazonaws.com/images/profileImages/2716d359-fd4e-43ed-ab4d-174664d2da0f.png",
                }}
              />
            </StyledDialog1>
          );
        }}
      />

      <Route
        path="/edit-wish-form"
        render={(props) => {
          return (
            <StyledDialog open={true}>
              <EditWishForm
                info={{
                  itemImage:
                    "https://wishtender.s3.amazonaws.com/images/profileImages/2716d359-fd4e-43ed-ab4d-174664d2da0f.png",
                }}
              />
            </StyledDialog>
          );
        }}
      />
      <Route
        path="/edit-wish-form2"
        render={(props) => {
          return (
            <StyledDialog1 open={true}>
              <EditWishForm
                info={{
                  itemImage:
                    "https://wishtender.s3.amazonaws.com/images/profileImages/2716d359-fd4e-43ed-ab4d-174664d2da0f.png",
                }}
              />
            </StyledDialog1>
          );
        }}
      />
      <Route
        path="/updateinfo"
        render={(props) => {
          return (
            <StyledDialog open={true}>
              <UpdateProfileForm />
            </StyledDialog>
          );
        }}
      />

      <Route
        path="/add-wish"
        render={(props) => {
          return (
            <StyledDialog open={true}>
              <AddWish></AddWish>
            </StyledDialog>
          );
        }}
      />
      <Route
        path="/add-wish2"
        render={(props) => {
          return (
            <StyledDialog1 open={true}>
              <AddWish></AddWish>
            </StyledDialog1>
          );
        }}
      />
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
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
      <Route path="/wishlist-setup">
        <SetUp />
      </Route>
      <Route
        path="/order"
        render={(props) => {
          return <CheckOutSuccess />;
        }}
      />
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route
        path="/cart"
        render={(props) => {
          return <Cart cart={props?.location?.props?.cart} />;
        }}
      />

      <Route
        path="/connect-success"
        exact
        render={(props) => {
          return (
            <div>
              <ConnectSuccess />
            </div>
          );
        }}
      />
      <Route
        path="/wish-tracker"
        render={(props) => {
          return <WishTracker />;
        }}
      />
      <Route path="/confirmation-email">
        <ConfirmationEmail />
      </Route>
      <Route path="/confirm-email">
        <ConfirmEmail />
      </Route>
      <Route path="/account-settings">
        <AccountSettings />
      </Route>

      <Route path="/:alias">
        <WishlistPage />
      </Route>
    </Switch>
  );

  const routesArray = SwitchRoutes.props.children.map(
    (child) => child.props.path
  );
  routesArray.push(
    routesArray.splice(
      routesArray.findIndex((r) => r === "/"),
      1
    )[0]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          {/* <Switch> */}
          {/* needs to render differently if not accessed from redirect */}
          {user !== undefined && (
            <LocaleContext.Provider
              value={cookies.locale ? JSON.parse(cookies.locale).locale : "en"}
            >
              <CountryContext.Provider
                value={
                  cookies.locale ? JSON.parse(cookies.locale).countryCode : "US"
                }
              >
                <CurrencyContext.Provider
                  value={{
                    currency,
                    currencyList,
                    setCurrency,
                    setCurrencyNeeded,
                    getCurrencyCookie,
                    setCurrencyCookie,
                    setCurrencyCookieAndContext,
                  }}
                >
                  <UserContext.Provider value={{ user, setUser, getUser }}>
                    <NotificationContext.Provider
                      value={{
                        notifications,
                        setNotifications,
                        getNotifications,
                      }}
                    >
                      <RouteContext.Provider
                        value={{
                          isCurrentUsersProfile,
                          setIsCurrentUsersProfile,
                          allRoutes: routesArray,
                        }}
                      >
                        {currencyNeeded && (
                          <StyledDialog
                            noClose={true}
                            open={currencyNeeded}
                            onClose={() => {
                              setCurrencyNeeded(false);
                              if (!currency) {
                                setCurrencyCookie("noConversion");
                              }
                            }}
                          >
                            <SelectCurrencyForm
                              onClose={() => {
                                setCurrencyNeeded(false);
                              }}
                              currencies={currencyList}
                            />
                          </StyledDialog>
                        )}
                        <Switch>
                          {/* <Route path="/" exact>
                          <LandingPageMenu />
                        </Route> */}
                          <Route path="/">
                            <Menu />
                          </Route>
                        </Switch>
                        {SwitchRoutes}
                      </RouteContext.Provider>
                    </NotificationContext.Provider>
                  </UserContext.Provider>
                </CurrencyContext.Provider>
              </CountryContext.Provider>
            </LocaleContext.Provider>
          )}
          {/* </Switch> */}
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
