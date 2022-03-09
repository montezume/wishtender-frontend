import React, { useContext } from "react";
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "../AppBar/AppBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Menu.css";
import { UserContext } from "../../../contexts/UserContext";
import theme from "../../../theme";
import { Button } from "@mui/material";
import useCustomStyles from "../../../themeStyles";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import AccountSettings from "../../AccountSettings/AccountSettings";
import useSmallScreen from "../../../hooks/useSmallScreen";
const StyledMenuItem = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid #e6e6e6",
    "&:first-child": {
      borderTop: "1px solid #e6e6e6",
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles({
  close: {
    backgroundColor: theme.palette.primary.extraLight,
    marginLeft: 0,
    "&:hover": {
      backgroundColor: theme.palette.primary.extraLight,
    },
  },
});

export default function Menu(props) {
  const { user } = useContext(UserContext);
  const smallScreen = useSmallScreen();
  const classes = useStyles(props);
  const customClasses = useCustomStyles(props);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [headerHeight, setHeaderHeight] = React.useState(null);

  const [buttonHeight, setButtonHeight] = React.useState(null);
  const [buttonWidth, setButtonWidth] = React.useState(null);

  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
      console.log("set to null");
    } else {
      var header = document.getElementsByTagName("header")[0];
      var button =
        document.getElementsByTagName("header")[0].children[0].children[0];

      setHeaderHeight(header.clientHeight);
      setButtonHeight(header.clientHeight);
      setButtonWidth(button.clientWidth + button.offsetLeft);
      setAnchorEl(header);
      console.log(anchorEl);
    }
  };

  return (
    <div id="menu">
      {smallScreen ? (
        <AppBar openMenu={handleClick} screen="xs" />
      ) : (
        <AppBar openMenu={handleClick} />
      )}
      {smallScreen && (
        <div>
          <div
            // className={`container_for_main_menu`}
            className={`container_for_main_menu ${
              anchorEl ? "m-fadeIn" : "m-fadeOut"
            }`}
          >
            <div
              className="flex"
              style={{ height: buttonHeight, width: buttonWidth }}
            >
              <IconButton edge="start" onClick={handleClick} className={classes.close} size="large">
                <CloseIcon />
              </IconButton>
            </div>
            <div className={`main_menu `} style={{ top: headerHeight }}>
              {!user && (
                <StyledMenuItem
                  component={Link}
                  to="/sign-up"
                  onClick={() => {
                    setAnchorEl(false);
                  }}
                  color="primary"
                >
                  <ListItemIcon>
                    <BorderColorRoundedIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography className={customClasses.gradient}>
                        Sign Up
                      </Typography>
                    }
                    // primary="Sign Up"
                  />
                </StyledMenuItem>
              )}
              {!user ? (
                <StyledMenuItem
                  component={Link}
                  to="/login"
                  onClick={() => {
                    setAnchorEl(false);
                  }}
                >
                  <ListItemIcon>
                    <AccountBoxIcon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText primary="Log In" />
                </StyledMenuItem>
              ) : (
                <>
                  <LogoutButton
                    callBack={() => {
                      setAnchorEl(false);
                    }}
                  >
                    <StyledMenuItem>
                      <ListItemIcon>
                        <AccountBoxIcon fontSize="small" />
                      </ListItemIcon>

                      <ListItemText primary="Log Out" />
                    </StyledMenuItem>
                  </LogoutButton>

                  <StyledMenuItem
                    component={Link}
                    onClick={() => {
                      setAnchorEl(false);
                    }}
                    to="/account-settings"
                    href="/account-settings"
                  >
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText primary="Account Settings" />
                  </StyledMenuItem>
                </>
              )}

              <StyledMenuItem
                onClick={() => {
                  setAnchorEl(false);
                }}
              >
                <ListItemIcon component={Link} to="/cart">
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Shopping Cart" />
              </StyledMenuItem>
            </div>
          </div>
        </div>
      )}
      {/* this div pushes all the divs under the header out from under dynamicalled*/}
    </div>
  );
}
