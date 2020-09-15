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

function ThankYou() {
  return (
    <div className="thank_you">
      {/* {heroSection()}
      {fourPointExplanation()} */}

      <h2>Success! You've been added to the wait list</h2>
      <p>
        Thank you for signing up. Access to our beta program is limited. If you
        would like to fast-track your way into beta approval, you can enter to
        win fast-track access by being a super supporter.&#128522;{" "}
      </p>
      <p>
        Simply tweet why your excited about WishTender and tag two people who
        might find value in WishTender. Don't forget to tag{" "}
        <a href="https://twitter.com/">@WishTender</a> so we can find your
        tweet! Here's a sample{" "}
        <a href="https://twitter.com/intent/tweet?text=I%27m%20excited%20to%20try%20@WishTender%20because%20%5Bfill%20out%20why%20you%27re%20excited%20for%20WishTender%5D.%20People%20that%20might%20also%20be%20interested%3A%20%5Btag%20some%20people%20here%5D">
          tweet
        </a>
        .
      </p>
    </div>
  );
}

export default ThankYou;
