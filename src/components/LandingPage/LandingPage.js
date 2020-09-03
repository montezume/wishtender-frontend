import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function heroSection() {
  return (
    <div className="hero_section_container">
      <div className="hero_section">
        <div className="triangle"></div>
        <div className="text">
          <h3>UNIVERSAL WISHLIST. SAFE SHIPPING.</h3>
          <h2>
            What you love. <br /> From your fans.
          </h2>
          <h3>Coming Soon</h3>
          Contact{" "}
          <a href="https://www.twitter.com/DashBarkHuss">@DashBarkHuss</a> on
          twitter for more information.
          {/* <Button variant="contained">Get Early Access</Button> */}
        </div>
      </div>
    </div>
  );
}

function fourPointExplanation() {
  return (
    <Grid container spacing={3} className="wishtender_4point_explanation">
      <Grid item xs={12}>
        <h2 className="title">A free and safe way to share wishlists.</h2>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="point">
          <div className="icon">
            <img src="images/icon_blue.png" />
          </div>
          <h3>One Stop Wishlist</h3>
          <p>
            Pick from any online store or create custom cash funds for college,
            travel, and more.
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="point">
          <div className="icon">
            <img src="images/icon_blue.png" />
          </div>
          <h3>Secure Shipping</h3>
          <p>
            Keep your mailing address and legal name private so you can receive
            gifts safely.
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="point">
          <div className="icon">
            <img src="images/icon_blue.png" />
          </div>
          <h3>Control Orders</h3>
          <p>
            Have full control of your gifts. Receive funds directly so you can
            control your orders.
          </p>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className="point">
          <div className="icon">
            <img src="images/icon_blue.png" />
          </div>
          <h3>Easy Integration</h3>
          <p>
            Integrate with your old wishlist so you don't have to start from
            scratch.
          </p>
        </Paper>
      </Grid>
    </Grid>
  );
}

function LandingPage() {
  return (
    <div>
      {heroSection()}
      {fourPointExplanation()}
      <Grid container spacing={3} className="large_explanation">
        <Grid item xs={12} m={6}>
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
      </Grid>
    </div>
  );
}

export default LandingPage;
