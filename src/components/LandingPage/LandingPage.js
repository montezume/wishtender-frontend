import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import useStyles from "../../themeStyles";
import { Link } from "react-router-dom";
import { init } from "ityped";

// import { withStyles } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const CallToAction = (props) => (
  <>
    {!props.signUp ? (
      <Button
        disableElevation
        className={props.classes.gradient + " " + props.classes.margin}
        style={{
          fontWeight: 600,
          marginLeft: 0,
        }}
        href={"https://landing.mailerlite.com/webforms/landing/k3y1m6"}
        variant="contained"
      >
        Request Access
      </Button>
    ) : (
      <Link to="/sign-up">
        <Button
          disableElevation
          className={props.classes.gradient + " " + props.classes.margin}
          style={{
            fontWeight: 600,
            marginLeft: 0,
          }}
          variant="contained"
        >
          Create Your Free Wishlist
        </Button>
      </Link>
    )}
  </>
);
const heroSection = (props) => {
  return (
    <div className="hero_section_container">
      <div className="hero_section">
        {/* <div className="triangle"></div> */}
        <div className="text">
          <h2>
            Get your <span id="type-change"> </span>
            <br></br>funded by your fans
          </h2>
          <h3>
            The international wishlist that protects you. <br />{" "}
            <span style={{ fontSize: ".8em" }}>
              Receive gift funds fast and worry free.
            </span>
          </h3>

          <CallToAction {...props} />
        </div>
      </div>
    </div>
  );
};

function fourPointExplanation() {
  return (
    <div className="wishtender_4point_explanation_container">
      <div className="wishtender_4point_explanation_container_inner">
        <Grid container spacing={3} className="wishtender_4point_explanation">
          <Grid item xs={12}>
            <h2 className="title">A free and safe way to share wishlists.</h2>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="point">
              <div className="icon">
                <img src="images/icon_wishlist.png" alt="wishlist icon" />
              </div>
              <h3>One Stop Wishlist</h3>
              <p>
                Pick from any online store or create custom cash funds for
                college, travel, and more.
              </p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="point">
              <div className="icon">
                <img src="images/icon_secure_address.png" alt="security icon" />
              </div>
              <h3>Hide Shipping Address</h3>
              <p>
                Keep your mailing address and legal name private so you can
                receive gifts safely.
              </p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="point">
              <div className="icon">
                <img
                  src="images/icon_control_orders.png"
                  alt="control orders icon"
                />
              </div>
              <h3>Control Orders</h3>
              <p>
                Decide when your orders get placed, add to orders, or keep the
                cash.
              </p>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper className="point">
              <div className="icon">
                <img
                  src="images/icon_no_judgement_web_optimized.png"
                  alt="no judgement icon"
                />
              </div>
              <h3>Non-Judgmental</h3>
              <p>
                WishTender is built to help you no matter what content you
                create.
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
function bulletPoints() {
  return (
    <div className="bullet_points">
      <div className="bullet_points_container">
        <div>
          {/* <h2 className="title">Designed to put you in control</h2> */}
          <ul>
            <li>✅ Get the cash for your gifts</li>
            <li>✅ Handle the funds as you like</li>
            <li>✅ 100% payout*</li>
            <li>✅ Send photo thank-you messages</li>
            <li>✅ Fraud chargeback protection</li>
            <li>✅ Two way anonymity</li>
            <li>✅ Supports 52 countries and counting</li>
            <li>✅ Livestream gift notifications</li>
            <Typography variant="subtitle2">
              *currency conversions may reduce payout minimally
            </Typography>
          </ul>
        </div>
        <img
          alt="wishtender cash graphic"
          src="images/to_you_optimized.png"
        ></img>
      </div>
    </div>
  );
}

function LandingPage(props) {
  const classes = useStyles(props);

  useEffect(() => {
    const myElement = document.querySelector("#type-change");
    init(myElement, {
      strings: [
        "Prada",
        "rent",
        "coffee",
        "shopping hauls",
        "iPhone",
        "groceries",
        "Honey Birdette",
      ],
      showCursor: false,
    });
  }, []);

  return (
    <div>
      {heroSection({ classes, ...props })}
      {bulletPoints()}
      {fourPointExplanation()}
      <Grid container spacing={3} className="large_explanation">
        <Grid item xs={12}>
          <h2>
            The safest and most flexible universal wishlist for public
            personalities.
          </h2>
          <p>
            Say hello to WishTender, a universal wishlist and gift registry
            platform- specially designed for influencers and public
            personalities. Build your wishlist with gifts from any retailer and
            have full control of privacy and orders. We're customer-focused;
            Building out the site with feedback from customers like you every
            step of the way.
          </p>
        </Grid>
        <Grid item xs={12}>
          <CallToAction classes={classes} {...props} />
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
