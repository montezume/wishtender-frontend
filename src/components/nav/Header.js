import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



function Header() {
  
  return (
    <header className= "custom">
  <div className="container">
      <IconButton edge="start" color="inherit" aria-label="menu" size="large">
          < MenuIcon style = {{fontSize:"2.5rem"}}/>
      </IconButton>
    
    <div>

  <img className= "logo" src = "images/logo.png"/>
    </div>
  <IconButton
    edge="end"
    className="cart_button"
    color="inherit"
    aria-label="cart"
    size="large">
              <ShoppingCartIcon style = {{fontSize:"2.5rem"}} />
            </IconButton>
  </div>
  </header>
  );}

export default Header;
