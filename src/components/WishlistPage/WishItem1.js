import React, { useContext, useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DisplayPrice from "../common/DisplayPrice";
import DisplayPrice2 from "../common/DisplayPrice2";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button, Box, Tabs, Tab } from "@material-ui/core";
import html2canvas from "html2canvas"; // this is an edited version found here
import { WishlistContext } from "../../contexts/WishlistContext";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const styles = makeStyles({
  linkButton: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});
const tweetIntent = (id, handle) => {
  window.open(
    `https://twitter.com/intent/tweet?text=I%20just%20added%20a%20new%20item%20to%20my%20wishlist.%20%0a%0aBuy%20it%20for%20me%20here%3A%20https%3A//www.wishtender.com/${handle}%3Fitem%3D${id}%20via%20@WishTender%20`,
    "popup",
    "width=600,height=600"
  );
};

export default function MediaCard(props) {
  let { alias: aliasPath } = useParams();

  const { wishlist } = useContext(WishlistContext);

  return (
    <Card className="wish_item">
      <CardActionArea>
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
