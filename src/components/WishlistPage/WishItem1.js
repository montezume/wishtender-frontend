import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DisplayPrice from "../common/DisplayPrice";
import DisplayPrice2 from "../common/DisplayPrice2";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button, Box, Tabs, Tab } from "@mui/material";
import { WishlistContext } from "../../contexts/WishlistContext";
import makeStyles from "@mui/styles/makeStyles";
import { useParams } from "react-router-dom";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { ClassNames } from "@emotion/react";
const styles = makeStyles({
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

  /* (Optional) Apply a "closed-hand" cursor during drag operation. */
});
const tweetIntent = (id, handle) => {
  window.open(
    `https://twitter.com/intent/tweet?text=I%20just%20added%20a%20new%20item%20to%20my%20wishlist.%20%0a%0aBuy%20it%20for%20me%20here%3A%20https%3A//www.wishtender.com/${handle}%3Fitem%3D${id}%20via%20@WishTender%20`,
    "popup",
    "width=600,height=600"
  );
};

export default function MediaCard({ listeners, draggable, ...props }) {
  let { alias: aliasPath } = useParams();
  const { wishlist } = useContext(WishlistContext);
  const classes = styles(props);
  return (
    <Card className="wish_item">
      <CardActionArea>
        {draggable && props.isAuth && (
          // drag handle
          <div
            className={classes.grabbable + " " + classes.dragHandle}
            onClick={(e) => {
              e.stopPropagation();
            }}
            {...listeners}
          >
            <DragHandleIcon />
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
            alt={props.itemName}
            src={props.imageUrl}
            style={{ position: "absolute", width: "100%" }}
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
