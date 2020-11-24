import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import React from 'react';
import logo from "./logo.svg";
// import './App.css';
import "./myapp.css";
import ProfileSection from "./components/wishlistpage/ProfileSection/ProfileSection";
import Header from "./components/nav/Header";
import Wishlist from "./components/wishlistpage/Wishlist";
import AppBar from "./components/nav/AppBar";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import ThankYou from "./components/LandingPage/ThankYou";
import CustomizedMenus from "./components/nav/menu.js";
import LandingPageMenu from "./components/LandingPage/LandingPageMenu.js";

import { ThemeProvider } from "@material-ui/styles";
import WishlistPage from "./components/wishlistpage/WishlistPage";

import AddWish from "./components/wishlistpage/addwish/AddWish.js";
import EditWishes from "./components/wishlistpage/EditWishes.js";
import SignUp from "./components/SignUp/SignUp";
import SetUp from "./components/SetUp/SetUp";
// import './Styles/App.css';
import theme from "./theme";

function App(props) {
  const user = {
    bannerPicUrl: "/images/banner_pic.png",
    profilePicUrl: "/images/profile_pic.png",
    displayName: "Brittany K.",
    name: { first: "Brittany", last: "Kochover" },
    profileMessage: "Love you guys <3",
    wishlistItems: [
      {
        itemName: "YSL Stilettos",
        price: "1000.00",
        imageUrl: "/images/heels.png",
      },
      {
        itemName: "Reformation Dress",
        price: "300.00",
        imageUrl: "/images/dress.png",
      },
      {
        itemName: "Night Pallette",
        price: "37.00",
        imageUrl: "/images/makeup.png",
      },
    ],
  };
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        // style={{ display: "flex", flexDirection: "column" }}
      >
        <Router>
          <Route
            path="/"
            exact
            render={(props) => {
              return (
                <div>
                  <LandingPageMenu />
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
                  <LandingPageMenu />
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
                  <CustomizedMenus />
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
                  <CustomizedMenus />
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
                  <CustomizedMenus />
                  <SetUp />
                </div>
              );
            }}
          />
          <Route
            path="/wishlist"
            render={(props) => {
              return (
                <div>
                  <CustomizedMenus />
                  <WishlistPage user={user} />
                </div>
              );
            }}
          />
          <Route
            path="/demo/wishlist"
            render={(props) => {
              return (
                <div>
                  <CustomizedMenus />
                  <WishlistPage user={user} />
                </div>
              );
            }}
          />
          <Route
            path="/demo/addwish"
            render={(props) => {
              return (
                <div>
                  <CustomizedMenus />
                  <AddWish />
                </div>
              );
            }}
          />
          <Route path="/demo/editwishes" component={EditWishes} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
