import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import React from 'react';
import logo from "./logo.svg";
// import './App.css';
import "./myapp.css";
import ProfileSection from "./components/wishlistpage/ProfileSection";
import Header from "./components/nav/Header";
import Wishlist from "./components/wishlistpage/Wishlist";
import AppBar from "./components/nav/AppBar";
import HomePage from "./components/HomePage";
import CustomizedMenus from "./components/nav/menu.js";

import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import { ThemeProvider } from "@material-ui/styles";
import WishlistPage from "./components/wishlistpage/WishlistPage";

import AddWish from "./components/wishlistpage/addwish/AddWish.js";
import EditWishes from "./components/wishlistpage/EditWishes.js";
// import './Styles/App.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#02bff2",
    },
    secondary: {
      main: green[500],
    },
  },
});

function App(props) {
  const user = {
    bannerPicUrl: "images/banner_pic.png",
    profilePicUrl: "images/profile_pic.png",
    displayName: "Brittany K.",
    name: { first: "Brittany", last: "Kochover" },
    profileMessage: "Love you guys <3",
    wishlistItems: [
      {
        itemName: "YSL Stilettos",
        price: "1000.00",
        imageUrl: "images/heels.png",
      },
      {
        itemName: "Reformation Dress",
        price: "300.00",
        imageUrl: "images/dress.png",
      },
      {
        itemName: "Night Pallette",
        price: "37.00",
        imageUrl: "images/makeup.png",
      },
    ],
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CustomizedMenus />

        <Router>
          <Route path="/" exact component={HomePage} />
          <Route path="/wishlist" render={() => <WishlistPage user={user} />} />
          <Route path="/editwishes" component={EditWishes} />
          <Route path="/addwish" component={AddWish} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
