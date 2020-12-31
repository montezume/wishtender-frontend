import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { LocaleContext } from "../../contexts/LocaleContext";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const clientCurrency = useContext(CurrencyContext);
  const localeContext = useContext(LocaleContext);

  const classes = useStyles();

  return (
    <Card className="wish_item">
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          image="/images/dress.png"
          title="Contemplative Reptile"
        /> */}
        <div
          className="imageItem"
          style={{
            position: "relative",
            overflow: "hidden",
            paddingBottom: "100%",
          }}
        >
          <img
            src={props.imageUrl}
            style={{ position: "absolute", width: "100%" }}
          />
        </div>

        <CardContent>
          <Typography gutterBottom component="h2" color="textSecondary">
            {props.itemName}
          </Typography>
          <Typography color="textPrimary" className="price">
            {/* en should actual be current user language */}
            {/* How to get en? from browser then set in user context? */}

            {props.convertRate &&
              new Intl.NumberFormat(localeContext, {
                style: "currency",
                currency: clientCurrency,
              }).format(props.price * (props.convertRate || 1))}

            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: props.currency,
            }).format(props.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
