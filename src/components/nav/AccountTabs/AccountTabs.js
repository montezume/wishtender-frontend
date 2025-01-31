import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useRouteMatch } from "react-router-dom"; // a comment (can be deleted)
import { RouteContext } from "../../../contexts/RouteContext";
import { UserContext } from "../../../contexts/UserContext";
import { NotificationContext } from "../../../contexts/NotificationContext";
import theme from "../../../theme";
import { withRouter } from "react-router";

import themeStyles from "../../../themeStyles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RedeemIcon from "@mui/icons-material/Redeem";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { BrowserRouter as Router, Route } from "react-router-dom";
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
  tab: { minWidth: theme.spacing(8) },
}));
const TabTooltip = withStyles({
  tooltip: {
    margin: 2,
  },
})(Tooltip);
export default withRouter(function AccountTabs(props) {
  const classes1 = useStyles();
  const classes = themeStyles(props);
  const [activeTab, setActiveTab] = useState(false);
  const [alias, setAlias] = useState(false);
  const [newGifts, setNewGifts] = useState(null);
  const routeContext = useContext(RouteContext);
  const userContext = useContext(UserContext);
  const notificationContext = useContext(NotificationContext);
  const match = useRouteMatch(
    routeContext.allRoutes.filter((route) => route !== "/:alias")
  );
  const isProfileRoute = !match.isExact;
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    let val;
    if (isProfileRoute && routeContext.isCurrentUsersProfile) {
      val = 0;
    } else if (match.path === "/wish-tracker") {
      val = 1;
    } else {
      val = false;
    }
    setActiveTab(val);
  }, [isProfileRoute, match.path, routeContext.isCurrentUsersProfile]);
  return (
    <div>
      {alias && <Redirect to={`/${alias}`} />}
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <TabTooltip title="Wishlist">
          <Tab
            className={classes1.tab}
            onClick={async () => {
              const res = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/aliases?user=${userContext.user._id}`,
                { credentials: "include" }
              );
              if (res.status === 204) {
                props.history.push("/wishlist-setup");
              }
              const json = await res.json();
              setAlias(json.handle);
              setAlias(false);
            }}
            icon={<ListAltIcon />}
            // label={props.screen === "xs" ? null : "Wishlist"}
          />
        </TabTooltip>
        <TabTooltip title="Wish-Tracker">
          <Tab
            className={classes1.tab}
            component={Link}
            to="/wish-tracker"
            icon={
              <Badge
                badgeContent={notificationContext.notifications}
                color="error"
                className={classes.gradient}
              >
                <RedeemIcon />
              </Badge>
            }
            aria-label="Wish Tracker"
            // label={props.screen === "xs" ? null : "wish-tracker"}
          />
        </TabTooltip>
      </Tabs>
    </div>
  );
});
