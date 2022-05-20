import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DisplayPrice2 from "../common/DisplayPrice2";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
import { WishlistContext } from "../../contexts/WishlistContext";
import makeStyles from "@mui/styles/makeStyles";
import { useParams } from "react-router-dom";
import DragHandleIcon from "@mui/icons-material/DragHandle";

import { changeWishlistOrder } from "./WishlistComponents/wishlistHelpers";
const styles = makeStyles((theme) => {
  return {
    linkButton: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    grabbable: {
      cursor: "move" /* fallback if grab cursor is unsupported */,
      cursor: "grab",
      cursor: "-moz-grab",
      cursor: "-webkit-grab",
      "&:active": {
        cursor: "grabbing",
        cursor: "-moz-grabbing",
        cursor: "-webkit-grabbing",
      },
    },
    dragHandle: {
      position: "absolute",
      zIndex: "99",
      background: "#00000010",
      borderBottomLeftRadius: "6px",
      color: "white",
      right: "0px",
      display: "flex",
    },
    toBottomButton: {
      // display: "inline",
      position: "relative",
      zIndex: "99",
      background: "#00000010",
      color: "white",
      right: "0px",
      borderBottomRightRadius: "6px",
      // display: "flex",
    },
    toTopButton: {
      borderBottomRightRadius: "6px",
      // display: "inline",
      position: "relative",
      zIndex: "99",
      background: "#00000010",
      color: "white",
      left: "0px",
      // display: "flex",
    },
    topBottomControls: {
      display: "flex",
      position: "absolute",
    },
    giftLabelContainer: {
      zIndex: "300",
      position: "absolute",
      top: 0,
      left: 0,
      display: "block",
      padding: "10px 0",
      lineHeight: 0,
      textAlign: "left",
    },
    giftLabel: {
      color: "#fff",
      backgroundColor: "#03abd8",
      width: "70px",
      height: "20px",
      lineHeight: "20px",
      display: "block",
      position: "relative",
      textTransform: "uppercase",
      fontSize: "10px",
      padding: "0 2px 0 5px",
      borderRadius: 0,
      margin: "0 0 5px",
      letterSpacing: ".8px",
      textAlign: "center",
      fontWeight: "800",
      "&::after": {
        borderTopColor: "#03abd8",
        width: 0,
        height: 0,
        display: "block",
        position: "absolute",
        content: '""',
        top: 0,
        left: "100%",
        borderColor: "rgba(0,0,0,0)",
        borderStyle: "solid",
        borderWidth: "20px 10px 0 0",
      },
    },
  };
});

const tweetIntent = (id, handle) => {
  window.open(
    `https://twitter.com/intent/tweet?text=I%20just%20added%20a%20new%20item%20to%20my%20wishlist.%20%0a%0aBuy%20it%20for%20me%20here%3A%20https%3A//www.wishtender.com/${handle}%3Fitem%3D${id}%20via%20@WishTender%20`,
    "popup",
    "width=600,height=600"
  );
};

export default function WishItem({
  listeners,
  draggable,
  favorite,
  sortItemsIsNotDefault,
  showToBottom,
  showToTop,
  items,
  notAllCategoriesShowing,
  setItems,
  setOrderedItems,
  ...props
}) {
  const wishlistContext = useContext(WishlistContext);
  let { alias: aliasPath } = useParams();
  const classes = styles(props);

  const preventDragIfNecessary = () => {
    preventDragIfSortOrderNotDefault();
    preventDragIfNotAllCategoriesShowing();
  };
  const preventDragIfSortOrderNotDefault = (e) => {
    if (sortItemsIsNotDefault) {
      alert("Set 'Sort Items' to 'Default' to organize your wishlist.");
      e.stopPropagation();
    }
  };
  const preventDragIfNotAllCategoriesShowing = (e) => {
    if (notAllCategoriesShowing) {
      alert("Set 'Categories' to 'All' to organize your wishlist.");
      e.stopPropagation();
    }
  };

  const moveToBottom = async (itemToMove) => {
    wishlistContext.setMoveSucceeded("toBottom");
    await changeWishlistOrder(
      itemToMove,
      items.length,
      items,
      setItems,
      setOrderedItems,
      wishlistContext
    );
  };

  const toBottomBtn = (
    <div
      //
      className={classes.toBottomButton}
      onClick={async (e) => {
        e.stopPropagation();
        preventDragIfNecessary();
        const itemToMove = items.find((i) => i._id === props.id);
        await moveToBottom(itemToMove);
      }}
    >
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="currentcolor"
        color="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 18h12v2H6zm5-14v8.586L6.707 8.293 5.293 9.707 12 16.414l6.707-6.707-1.414-1.414L13 12.586V4z" />
      </svg>
    </div>
  );

  const moveToTop = async (itemToMove) => {
    wishlistContext.setMoveSucceeded("toTop");
    await changeWishlistOrder(
      itemToMove,
      1,
      items,
      setItems,
      setOrderedItems,
      wishlistContext
    );
  };

  const toTopBtn = (
    <div
      //
      className={classes.toTopButton}
      onClick={async (e) => {
        e.stopPropagation();
        preventDragIfNecessary();
        const itemToMove = items.find((i) => i._id === props.id);

        await moveToTop(itemToMove);
      }}
    >
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentcolor"
          color="white"
          d="M6 4h12v2H6zm.707 11.707L11 11.414V20h2v-8.586l4.293 4.293 1.414-1.414L12 7.586l-6.707 6.707z"
        />
      </svg>
    </div>
  );
  const preventDragging = sortItemsIsNotDefault || notAllCategoriesShowing;
  const dragHandle = (
    <div
      style={{
        touchAction: "none",
        userSelect: "none",
        MozUserSelect: "none",
        WebkitUserSelect: "none",
      }}
      //
      className={classes.grabbable + " " + classes.dragHandle}
      onClick={(e) => {
        e.stopPropagation();
      }}
      {...(preventDragging
        ? [{ onPointerDown: preventDragIfNecessary }]
        : listeners)}
    >
      <DragHandleIcon onPointerDown={preventDragIfNecessary} />
    </div>
  );

  return (
    <Card className="wish_item">
      <CardActionArea>
        {draggable && props.isAuth && (
          <>
            <div className={classes.topBottomControls}>
              {showToTop && toBottomBtn}
              {showToBottom && toTopBtn}
            </div>
            {dragHandle}
          </>
        )}

        {favorite && (
          <div
            style={draggable && props.isAuth ? { paddingTop: "30px" } : {}}
            class={classes.giftLabelContainer}
          >
            <div>
              <span className={classes.giftLabel}>Favorite</span>
            </div>
          </div>
        )}

        <div
          className="imageItem"
          style={{
            position: "relative",
            overflow: "hidden",
            paddingBottom: "100%",
            background: "white",
          }}
        >
          <img
            draggable={false}
            pointerEvents="none"
            alt={props.itemName}
            src={props.imageUrl}
            style={{
              position: "absolute",
              width: "100%",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
            }}
          />
        </div>
        <CardContent>
          <Typography gutterBottom component="h2" color="textSecondary">
            {props.itemName}
            {/* {`${props.itemName.slice(0, 50)}${
              props.itemName.length > 40 ? "..." : ""
            }`} */}
          </Typography>
          <Typography color="textPrimary" className="price">
            <DisplayPrice2 priceObject={props.price} type="" />
          </Typography>
        </CardContent>
        {props.isAuth && (
          <Button
            style={{ float: "right" }}
            color="primary"
            endIcon={<TwitterIcon />}
            onClick={(e) => {
              e.stopPropagation();
              tweetIntent(props.id, aliasPath);
            }}
          >
            Share
          </Button>
        )}
      </CardActionArea>
      <div
        id={`share-card-${props.id}`}
        style={{
          position: "absolute",
          zIndex: 900,
          display: "none",
        }}
      ></div>
    </Card>
  );
}
