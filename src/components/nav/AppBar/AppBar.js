import React, { useState, useContext, useEffect } from "react";
import withStyles from '@mui/styles/withStyles';
import { Link, withRouter } from "react-router-dom";
import AccountIcon from "@mui/icons-material/AccountBox";
import PopUpMenu from "../../common/PopUpMenu/PopUpMenu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserContext } from "../../../contexts/UserContext";
import LogoutButton from "../LogoutButton/LogoutButton";
import SignupButton from "../SignupButton/SignupButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import { CartContext } from "../../../contexts/CartContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// app bar
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountTabs from "../AccountTabs/AccountTabs";
import "./AppBar.css";
import useCustomStyles from "../../../themeStyles";
import { MenuItem } from "@mui/material";
import CurrenciesMenu from "../CurrenciesMenu";

const styles = (theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 900,
  },
  doubleIconButton: {
    "&:hover": { background: "none" },
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

function BackToTop(props) {
  const { user } = useContext(UserContext);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [currencyMenuAnchor, setCurrencyMenuAnchor] = useState(null);
  const { cartNotifications } = useContext(CartContext);

  const [scrolledStyle, setscrolledStyle] = useState("noShadow");
  const toggleAccountMenu = (event) => {
    if (accountMenuAnchor) {
      setAccountMenuAnchor(null);
    } else {
      setAccountMenuAnchor(event.currentTarget);
    }
  };
  const toggleCurrencyMenu = (event) => {
    if (currencyMenuAnchor) {
      setCurrencyMenuAnchor(null);
    } else {
      setCurrencyMenuAnchor(event.currentTarget);
    }
  };

  const listenScrollEvent = (event) => {
    if (window.scrollY < 70) {
      return setscrolledStyle("noShadow");
    } else if (window.scrollY >= 70) {
      return setscrolledStyle("shadow");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  const classes = useCustomStyles(props);
  const ShoppingCartButton = (
    <IconButton component={Link} to="/cart" color="primary" size="large">
      <Badge badgeContent={cartNotifications} color="error">
        <ShoppingCartIcon></ShoppingCartIcon>
      </Badge>
    </IconButton>
  );
  return (
    <React.Fragment>
      {/* app bar */}
      <AppBar className={scrolledStyle}>
        <Toolbar style={{ width: "100%", height: "100%" }}>
          {props.screen === "xs" && (
            <IconButton
              onClick={props.openMenu}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              size="large">
              <MenuIcon />
            </IconButton>
          )}

          <div className="logo container">
            <a href="/">
              <img
                alt="WishTender logo"
                className="logo"
                src={
                  props.screen === "xs"
                    ? "/images/icon_logo.png"
                    : "/images/logo.png"
                }
                style={
                  props.screen === "xs"
                    ? {
                        maxHeight: "35px",
                        maxWidth: "100%",
                        top: "-3px",
                        position: "relative",
                      }
                    : {
                        maxHeight: "68px",
                        maxWidth: "100%",
                        top: "-3px",
                        position: "relative",
                      }
                }
              />
            </a>
          </div>
          <Button
            className={classes.margin}
            component={Link}
            to={{
              pathname: "/how-it-works",
              state:
                props.location.pathname !== "/" && !user?.email
                  ? { userType: "gifters" }
                  : { userType: "wishers" },
            }}
          >
            How it works
          </Button>

          <Tooltip title="Leaderboard" aria-label="Leaderboard">
            <IconButton
              className={classes.doubleIconButton}
              href="/leaderboard"
              aria-label="leaderboard"
              size="large">
              <StarBorderIcon />
            </IconButton>
          </Tooltip>
          {!user ? (
            props.screen !== "xs" ? (
              <>
                <CurrenciesMenu />

                {ShoppingCartButton}
                <Button
                  component={Link}
                  to="/login"
                  color="primary"
                  href="/login"
                  className={classes.margin}
                >
                  Login
                </Button>
                <SignupButton />
              </>
            ) : (
              <>
                <CurrenciesMenu />
                {ShoppingCartButton}
              </>
            )
          ) : (
            <>
              <AccountTabs screen={props.screen} />
              {/* {ShoppingCartButton} */}
              {props.screen !== "xs" && (
                <>
                  <Tooltip title="Account" aria-label="account">
                    <IconButton
                      className={classes.doubleIconButton}
                      onClick={toggleAccountMenu}
                      aria-label="logout"
                      size="large">
                      <AccountIcon />
                      <ExpandMoreIcon />
                    </IconButton>
                  </Tooltip>
                  <PopUpMenu
                    onClose={() => setAccountMenuAnchor(null)}
                    anchorEl={accountMenuAnchor}
                    open={accountMenuAnchor}
                  >
                    <MenuItem
                      component={Link}
                      to="/account-settings"
                      color="primary"
                      href="/account-settings"
                      onClick={() => setAccountMenuAnchor(null)}
                    >
                      Account Settings
                    </MenuItem>
                    <LogoutButton>
                      <MenuItem onClick={() => setAccountMenuAnchor(null)}>
                        Log out
                      </MenuItem>
                    </LogoutButton>
                  </PopUpMenu>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
export default withRouter(withStyles(styles)(BackToTop));
