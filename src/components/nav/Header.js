import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';



function Header() {
  
  return (<header className= "custom">
<div className="container">
    <IconButton edge="start"  color="inherit" aria-label="menu">
        < MenuIcon style = {{fontSize:"2.5rem"}}/>
    </IconButton>
  
  <div>

<img className= "logo" src = "images/logo.png"/>
  </div>
<IconButton edge="end" className="cart_button" color="inherit" aria-label="cart">
            <ShoppingCartIcon style = {{fontSize:"2.5rem"}} />
          </IconButton>
</div>
</header>
    )}

export default Header;
