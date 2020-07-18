import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './myapp.css';
import ProfileSection from './ProfileSection';
import Header from './Header';
import Wishlist from './Wishlist';
import AppBar from './AppBar';
import HomePage from './HomePage';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import WishlistPage from './WishlistPage';
// import './Styles/App.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});





function App(props) {
  const user = {
    bannerPicUrl: "images/banner_pic.png",
    profilePicUrl: "images/profile_pic.png",
    displayName: "Brittany K.",
    name: {first: "Brittany", last: "Kochover"},
    profileMessage: "Love you guys <3",
    wishlistItems: [
      {
          itemName: "YSL Stilettos",
          price: "1000.00",
          imageUrl: "images/heels.png"
      },
      {
          itemName: "Reformation Dress",
          price: "300.00",
          imageUrl: "images/dress.png"
      },
      {
          itemName: "Night Pallette",
          price: "37.00",
          imageUrl: "images/makeup.png"
      },
  
  ]

  }
  return (
    <ThemeProvider theme={theme}>

    <div className="App">
      {/* <Header /> */}
      <AppBar position="fixed"/>

      {/* <WishlistPage user= {user}/> */}
      <HomePage />
    </div>
    </ThemeProvider>
  );
}

export default App;
