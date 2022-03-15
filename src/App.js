import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { CartContext } from "./contexts/CartContext";
// import { ExchangeRatesContext } from "./contexts/ExchangeRatesContext";

import { RouteContext } from "./contexts/RouteContext";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Extension from "./components/Extension/Extension";
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
import FAQ from "./components/FAQ/FAQ";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import OBSPlugin from "./components/OBS/OBSPlugin";
import UserActivity from "./components/UserActivity/UserActivity";
// import ReferralDashboard from "./components/Referral/Dashboard";
// import ReferralSetup from "./components/Referral/Setup";
import Footer from "./components/Footer/Footer";
import ThankYou from "./components/LandingPage/ThankYou";
import Menu from "./components/nav/Menu/Menu.js";
import Cart from "./components/Cart/Cart.js";
import Login from "./components/Login/Login.js";
import WishTracker from "./components/WishTracker/WishTracker.js";
import ConfirmationEmail from "./components/Onboard/ConfirmationEmail/ConfirmationEmail";
import ConfirmEmail from "./components/Onboard/ConfirmEmail/ConfirmEmail";

// import { ThemeProvider, StyledEngineProvider } from "@mui/styles";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import WishlistPage from "./components/WishlistPage/WishlistPage2";

// import AddWish from "./components/wishlistpage/addwish1/AddWish.js";
import SignUp from "./components/Onboard/SignUp/SignUp";
import SetUp from "./components/Onboard/SetUp/SetUp";
// import './Styles/App.css';
import theme from "./theme";
import CheckOutSuccess from "./components/CheckOutSuccess/CheckOutSuccess";
// import WishForm from "./components/wishlistpage/AddWish/WishForm/WishForm";
import ConnectSuccess from "./components/ConnectSuccess/ConnectSucess";
import { CssBaseline, Snackbar } from "@mui/material";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import SendResetPassword from "./components/ResetPassword/SendResetPassword";
import ResetPassword from "./components/ResetPassword/ResetLinkFlow/ResetPassword";
import StripeInstructions from "./components/WishlistPage/ProfileSection/StripeInstructions";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import CurrentMonthAll from "./components/LeaderBoard/CurrentMonthAll";
import Twenty21All from "./components/LeaderBoard/Twenty21All";
import Last30All from "./components/LeaderBoard/Last30All";
import TopWisherAlert from "./components/TopWisherAlert/TopWisherAlert";
import CommunityNotice from "./components/CommunityNotice/CommunityNotice";

function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split("?");
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + "=";
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0; ) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    return urlparts[0] + (pars.length > 0 ? "?" + pars.join("&") : "");
  }
  return url;
}

function App(props) {
  const { getUser } = useContext(UserContext);
  const { getCurrencyCookie, setCurrencyCookie, setCurrencyCookieAndContext } =
    useContext(CurrencyContext);

  const [rankNotification, setRankNotification] = useState();
  const [communityNotice, setCommunityNotice] = useState();
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [cartNotifications, setCartNotifications] = useState();
  const { getCartNotifications, getCart, cartNotificationsFromCart } =
    useContext(CartContext);

  const [currency, setCurrency] = useState(null);

  const [cookies, setCookies] = useState(parsedCookies());
  // const [exchangeRates, setExchangeRates] = useState();
  const [localeCookies, setLocaleCookies] = useState(cookies);
  const [currencyList, setCurrencyList] = useState(
    cookies?.locale ? getCurrencyList(JSON.parse(cookies?.locale)) : []
  );

  const [showCurrencySnackBar, setShowCurrencySnackBar] = useState(null);
  // const [currencyNeeded, setCurrencyNeeded] = useState(false);
  const currencyNotNeeded = window.location.pathname === "/";
  const { getNotifications } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState();
  const [isCurrentUsersProfile, setIsCurrentUsersProfile] = useState();
  useTraceUpdate(App.name, props, { user });

  // handle getting user
  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, [getUser]);

  // handle getting detecting currency preferences from locale cookie
  useEffect(() => {
    if (user && user?.currency) {
      return;
    }
    if (!currencyNotNeeded && !cookies?.currency && parsedCookies().locale) {
      const newCookies = parsedCookies();
      setCookies(newCookies);
      const locale = newCookies.locale ? JSON.parse(newCookies.locale) : null;
      const newList = getCurrencyList(locale);
      setCurrencyList(newList);
      ///what code do we need to pass to this?
      if (newList[0].match) {
        setCurrencyCookieAndContext(newList[0].code, setCurrency);
        setShowCurrencySnackBar(true);
      } else {
        setCurrencyCookieAndContext("noConversion", setCurrency);
        setShowCurrencySnackBar(true);
      }
    }
  }, [
    cookies,
    cookies?.currency,
    cookies.locale,
    currencyList,
    currencyNotNeeded,
    setCurrencyCookieAndContext,
    user,
  ]);
  // set cart
  useEffect(() => {
    if (user !== undefined) {
      (async () => {
        const notifications = await getCartNotifications();
        setCartNotifications(notifications);
      })();
    }
  }, [getCartNotifications, user]);

  // handle notifications
  useEffect(() => {
    if (user !== undefined) {
      (async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        if (user?.wishlists[0]) {
          fetch(process.env.REACT_APP_BASE_URL + "/api/notifications/notices", {
            credentials: "include",
            method: "GET",
            headers,
          })
            .then(async (res) => {
              if (res.status === 204) return;
              const json = await res.json();
              setCommunityNotice(json[0]);
            })
            .catch((err) => {
              alert("Error: " + err.message);
            });
        }

        fetch(process.env.REACT_APP_BASE_URL + "/api/notifications/new", {
          credentials: "include",
          method: "GET",
          headers,
        }).then(async (res) => {
          if (res.status === 204) return;

          if (res.status === 200) {
            const json = await res.json();
            const topRankNotification = json.filter(
              (r) => r?.code?.slice(0, 3) === "top"
            )[0];
            if (topRankNotification) {
              const message = topRankNotification.message;

              // no positive look behind in safari
              // const rank =
              //   topRankNotification.code.match(/(?<=top_)(.*)(?=_)/g)[0];
              const rank = topRankNotification?.code?.split("_")[1];
              const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];
              const month =
                months[
                  topRankNotification?.code?.split("_")[2].split("-")[0] - 1
                ];
              setRankNotification({
                id: topRankNotification._id,
                rank,
                month,
                message,
              });
            }
          }
        });
      })();
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const makeCookie = (key, value, seconds, baseUrl) => {
      const cookie = `${key}=${value}; max-age=${seconds}${
        baseUrl === "https://api.wishtender.com" ||
        baseUrl === "https://api-staging.wishtender.com"
          ? "; domain=wishtender.com"
          : ""
      }`;
      document.cookie = cookie;
      const newCookies = parsedCookies();
      setCookies(newCookies);
    };
    const referralCode = params.get("ref");

    if (referralCode) {
      const url = new URL(window.location);
      const signup = url.pathname === "/sign-up";
      const cookies = parsedCookies();

      if ((cookies.directedSignup || cookies.recentRef) && !signup) {
        return; // an directed signup reference or recent reference can't be overwritten except by a direct signup
      }

      const baseUrl = process.env.REACT_APP_BASE_URL;

      if (signup) {
        makeCookie("directedSignup", referralCode, 60 * 60, baseUrl);
      }
      makeCookie("ref", referralCode, 60 * 60 * 24 * 30, baseUrl);
      makeCookie("recentRef", referralCode, 60 * 60 * 24 * 3, baseUrl);
      makeCookie("directedSignup", referralCode, 60 * 60, baseUrl);
      window.location.href = removeURLParameter(window.location.href, "ref");
    }
  });

  useEffect(() => {
    // user user settings
    if (user && user?.currency) {
      return setCurrency(user.currency);
    }
    //set currency from the saved cookie
    if ((!user || !user?.currency) && parsedCookies().currency) {
      return setCurrency(getCurrencyCookie());
    }
  }, [getCurrencyCookie, user]);

  // handle notifications
  useEffect(() => {
    if (!user || !user.aliases || !user.aliases.length) return;
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
      <Route
        path="/stripe_instructions"
        render={(props) => {
          return <StripeInstructions></StripeInstructions>;
        }}
      />
      <Route
        path="/redirecting"
        render={(props) => {
          return <h1>Redirecting...</h1>;
        }}
      />
      <Route
        path="/"
        exact
        render={(props) => {
          return (
            <div>
              <LandingPage signUp={true} />
            </div>
          );
        }}
      />
      <Route
        path="/secret-door"
        exact
        render={(props) => {
          return (
            <div>
              <LandingPage signUp={true} />
            </div>
          );
        }}
      />
      <Route path="/extension" exact>
        <Extension />
      </Route>
      <Route path="/faq" exact>
        <FAQ />
      </Route>
      <Route path="/sign-up" exact>
        <SignUp />
      </Route>
      {/* <Route path="/email" exact>
        <UpdateEmail />
      </Route> */}
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
      <Route
        path="/cart"
        render={(props) => {
          return <Cart cart={props?.location?.props?.cart} />;
        }}
      />
      <Route path="/request-password-reset">
        {user ? <SendResetPassword></SendResetPassword> : <ForgotPassword />}
      </Route>
      <Route path="/reset-password">
        <ResetPassword />
      </Route>
      <Route component={HowItWorks} path="/how-it-works"></Route>
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
          return <>{user ? <WishTracker /> : <Login />}</>;
        }}
      />
      <Route
        path="/admin"
        render={(props) => {
          return <>{user.admin ? <Dashboard /> : "Not authorized"}</>;
        }}
      />
      <Route
        path="/activity"
        render={(props) => {
          return <>{user.admin ? <UserActivity /> : "Not authorized"}</>;
        }}
      />
      <Route
        exact
        path="/leaderboard"
        render={(props) => {
          return <LeaderBoard />;
        }}
      />
      <Route
        exact
        path="/leaderboard/current-month"
        render={(props) => {
          return <CurrentMonthAll />;
        }}
      />
      <Route
        exact
        path="/leaderboard/last-30-days"
        render={(props) => {
          return <Last30All />;
        }}
      />
      <Route
        exact
        path="/leaderboard/2021"
        render={(props) => {
          return <Twenty21All />;
        }}
      />
      {/* <Route
        exact
        path="/referral"
        render={(props) => {
          return (
            <>
              {user && (user.admin || user.referralInfo) ? (
                <ReferralDashboard />
              ) : (
                "Not authorized"
              )}
            </>
          );
        }}
      />
      <Route
        exact
        path="/referral/setup"
        render={(props) => {
          return (
            <>
              {user && (user.admin || user.referralInfo) ? (
                <ReferralSetup />
              ) : (
                "Not authorized"
              )}
            </>
          );
        }}
      /> */}
      <Route path="/confirmation-email">
        <ConfirmationEmail />
      </Route>
      <Route path="/confirm-email">
        <ConfirmEmail />
      </Route>
      <Route path="/account-settings">
        <AccountSettings />
      </Route>
      <Route path="/:alias" exact>
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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Router>
            {/* <Switch> */}
            {/* needs to render differently if not accessed from redirect */}
            {user !== undefined && (
              <LocaleContext.Provider
                value={
                  cookies.locale ? JSON.parse(cookies.locale).locale : "en"
                }
              >
                <CountryContext.Provider
                  value={
                    cookies.locale
                      ? JSON.parse(cookies.locale).countryCode
                      : "US"
                  }
                >
                  <CurrencyContext.Provider
                    value={{
                      currency,
                      currencyList,
                      setCurrency,
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
                        <CartContext.Provider
                          value={{
                            cart,
                            setCart,
                            getCartNotifications,
                            getCart,
                            cartNotificationsFromCart,
                            cartNotifications,
                            setCartNotifications,
                          }}
                        >
                          <RouteContext.Provider
                            value={{
                              isCurrentUsersProfile,
                              setIsCurrentUsersProfile,
                              allRoutes: routesArray,
                            }}
                          >
                            {currency && (
                              <Snackbar
                                style={{ top: "80px" }}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                                open={showCurrencySnackBar}
                                onClose={() => {
                                  setShowCurrencySnackBar(false);
                                }}
                                message={
                                  currency === "noConversion"
                                    ? "Your currency wasn't detected."
                                    : "Your currency was detected as " +
                                      currency
                                }
                                autoHideDuration={3500}
                              />
                            )}
                            {rankNotification && (
                              <TopWisherAlert
                                rank={rankNotification.rank}
                                message={rankNotification.message}
                                month={rankNotification.month}
                                id={rankNotification.id}
                                handle={user.aliases[0].handle}
                                setRankNotification={setRankNotification}
                              ></TopWisherAlert>
                            )}
                            {communityNotice && (
                              <CommunityNotice
                                message={communityNotice.message}
                                id={communityNotice._id}
                                setCommunityNotice={setCommunityNotice}
                              ></CommunityNotice>
                            )}
                            <div
                              style={{
                                minHeight: "calc(100vh - 72px)",
                                position: "relative",

                                // start too low without this???
                                // border: ".2px solid #9990",
                                // height: "100%",
                              }}
                            >
                              <Switch>
                                <Route exact path="/stream/:alias">
                                  <OBSPlugin />
                                </Route>
                                {/* <Route path="/" exact>
                              <LandingPageMenu />
                            </Route> */}

                                <Route path="/">
                                  <Menu />
                                </Route>
                              </Switch>
                              {SwitchRoutes}
                            </div>
                            <Footer></Footer>
                          </RouteContext.Provider>
                        </CartContext.Provider>
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
    </StyledEngineProvider>
  );
}

export default App;
