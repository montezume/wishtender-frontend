import React, { useEffect, useState, useContext } from "react";
import { WishlistContext } from "../../contexts/WishlistContext";
import { fetchGet } from "../../scripts/fetchHelper";
import { UserContext } from "../../contexts/UserContext";
import DisplayOrder from "./DisplayOrder";
import { parseOrderPrices } from "../../scripts/helpers";
import { LocaleContext } from "../../contexts/LocaleContext";
import Paper from "@mui/material/Paper";
import {
  Box,
  ListSubheader,
  Button,
  Container,
  List,
  Typography,
} from "@mui/material";
import RightIcon from "@mui/icons-material/KeyboardArrowRight";
import useSmallScreen from "../../hooks/useSmallScreen";

function WishTracker(props) {
  const smallScreen = useSmallScreen();
  const { user: currentUser } = useContext(UserContext);
  const clientLocale = useContext(LocaleContext);
  const { getWishlist } = useContext(WishlistContext);
  const [orders, setOrders] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [refreshOrders, setRefreshOrders] = useState(null);
  const paymentLink = `${process.env.REACT_APP_BASE_URL}/api/stripe/login?from=wish-tracker`;

  const paymentButton = currentUser.stripeAccountInfo?.activated ? (
    <Button
      color="primary"
      style={{ fontWeight: "500" }}
      disableElevation
      href={paymentLink}
    >
      Payment Dashboard <RightIcon color="primary" />
    </Button>
  ) : (
    <Button
      color="primary"
      style={{ fontWeight: "500" }}
      disableElevation
      onClick={() =>
        alert("You need to activate payments from the wishlist page first.")
      }
    >
      Payment Dashboard <RightIcon color="primary" />
    </Button>
  );
  // local 4000 if startlocal
  // api staging if startstaging
  // api if start
  useEffect(() => {
    if (currentUser || (refreshOrders && currentUser))
      fetchGet(
        `${process.env.REACT_APP_BASE_URL}/api/orders/${currentUser.aliases[0]}`,
        (orders) => {
          orders.reverse().map((order) => {
            parseOrderPrices(order, clientLocale);
            return order;
          });
          setOrders(orders);
          if (refreshOrders) setRefreshOrders(false);
        }
      );
  }, [clientLocale, currentUser, refreshOrders]);

  useEffect(() => {
    if (currentUser)
      (async () => {
        setWishlist(await getWishlist(currentUser.wishlists[0]));
      })();
  }, [currentUser, getWishlist]);

  return (
    // collapsing margin need display flex
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          marginTop: "7vw",
          paddingBottom: "7vw",
        }}
      >
        <WishlistContext.Provider
          value={{ wishlist, setWishlist, getWishlist }}
        >
          {currentUser &&
            (!smallScreen ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6" style={{ margin: "0 8px" }}>
                  Wish-Tracker
                </Typography>
                {paymentButton}
              </Box>
            ) : (
              <Box
                // display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                {paymentButton}

                <Typography variant="h6" style={{ margin: "0 8px" }}>
                  Wish-Tracker
                </Typography>
              </Box>
            ))}
          <Paper style={{ marginTop: "2vw" }}>
            <List
              component="nav"
              aria-labelledby="wishes-granted-subheader"
              subheader={
                <ListSubheader
                  style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
                  component="div"
                  id="wishes-granted-subheader"
                >
                  Transactions: {orders && orders.length}
                  {orders && (
                    <span style={{ float: "right", display: "block" }}>
                      New:{" "}
                      {orders.filter((order) => order.seen === false).length}
                    </span>
                  )}
                  {/* <Typography style={{ float: "left" }} display="inline">
              Transactions: {orders && orders.length}
              </Typography>
              <Typography
              align="right"
              style={{ float: "right" }}
              display="inline"
              >
              {currentUser.email}
            </Typography> */}
                </ListSubheader>
              }
            >
              {orders &&
                orders.map((order) => {
                  return (
                    <DisplayOrder
                      setRefreshOrders={setRefreshOrders}
                      order={order}
                      screen={smallScreen && "xs"}
                    />
                  );
                })}
            </List>
          </Paper>
        </WishlistContext.Provider>
      </Container>
    </div>
  );
}

export default WishTracker;
