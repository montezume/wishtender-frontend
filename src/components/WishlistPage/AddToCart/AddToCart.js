import React, { useState, useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";
import { Box, Button, Typography } from "@mui/material";
import { fetchPatchJson } from "../../../scripts/fetchHelper";
import { Redirect } from "react-router-dom";
import StyledDialog from "../../common/StyledDialog/StyledDialog";
import DialogClose from "../../common/StyledDialog/TopSections/TopSection/DialogClose";
import theme from "../../../theme";
import useScreenSize from "../../../hooks/useScreenSize";
import DisplayPrice2 from "../../common/DisplayPrice2";
export default function AddToCart(props) {
  const [cart, setCart] = useState(false);
  const cartContext = useContext(CartContext);

  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const updateCart = async () => {
    const notifications = await cartContext.getCartNotifications();
    cartContext.setCartNotifications(notifications);
  };
  const handleClickAddAndShop = () => {
    fetchPatchJson(
      { itemId: props.item._id },
      process.env.REACT_APP_BASE_URL + "/api/cart/add-to-cart",
      updateCart
    );
    props.onClose();
  };
  const handleClickAddAndCheckOut = () => {
    fetchPatchJson(
      { itemId: props.item._id },
      process.env.REACT_APP_BASE_URL + "/api/cart/add-to-cart",
      setCart
    );
  };
  return (
    <StyledDialog
      background="url(/images/background_bow_confetti-sm_optimized.png)"
      background_xs="url(/images/background_bow_confetti_xs_optimized.png)"
      onClose={props.onClose}
      open={props.open}
    >
      <>
        <DialogClose onClose={props.onClose} />
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          alignItems="center"
          justifyContent="center"
          style={{
            gap: "14px",
            width: "fit-content",
            // background: "url(/images/background_bow_confetti.png)",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "-80px",

            maxHeight: "80%",
            padding:
              screenSize === "xs"
                ? theme.spacing(5, 0, 0, 0)
                : theme.spacing(6, 2, 6, 2),
            margin: screenSize === "sm" ? theme.spacing(0, 4, 0, 4) : "auto",
          }}
        >
          {cart && (
            <Redirect to={{ pathname: `/cart`, props: { cart: cart } }} />
          )}
          <Typography color="primary" variant="h5">
            Add To Cart
          </Typography>
          <img
            style={{
              width: "170px",
              boxShadow: "20px 20px 30px grey",
              borderRadius: "4px",
              margin: "20px",
            }}
            src={props.item.itemImage}
            alt="wish item"
          ></img>
          <Typography
            style={{
              maxWidth: "300px",
              textAlign: "center",
              color: "rgba(0, 0, 0, 0.54)",
            }}
          >
            {props.item.itemName}
          </Typography>

          <Typography style={{ fontWeight: "600" }}>
            <DisplayPrice2 priceObject={props.item.price} type="" />
          </Typography>
          <Button
            // disableElevation={true}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleClickAddAndShop}
          >
            Add To Cart and Keep Shopping
          </Button>
          <Button
            // disableElevation={true}
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleClickAddAndCheckOut}
          >
            Add To Cart and Check Out
          </Button>
        </Box>
      </>
    </StyledDialog>
  );
}
