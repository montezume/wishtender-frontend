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

export default function WishItemOverlay({ itemName, imageUrl, price, isAuth }) {
  const classes = styles();
  return (
    <Card className="wish_item">
      <CardActionArea>
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
        >
          <DragHandleIcon />
        </div>
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
            pointerEvents="none"
            draggable={false}
            alt={itemName}
            src={imageUrl}
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
            {`${itemName.slice(0, 50)}${itemName.length > 40 ? "..." : ""}`}
          </Typography>
          <Typography color="textPrimary" className="price">
            <DisplayPrice2 priceObject={price} type="" />
          </Typography>
        </CardContent>
        {isAuth && (
          <Button
            style={{ float: "right" }}
            color="primary"
            endIcon={<TwitterIcon />}
          >
            Share
          </Button>
        )}
      </CardActionArea>
    </Card>
  );
}
