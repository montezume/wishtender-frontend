import React, { useEffect, useState, useContext } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Button, Tooltip, Typography } from "@mui/material";
import FileCopy from "@mui/icons-material/FileCopy";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { UserContext } from "../../../contexts/UserContext";
import theme from "../../../theme";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { withRouter } from "react-router";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Snackbar from "@mui/material/Snackbar";

export default withRouter(function StripeInstructions(props) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const video = () => {
    const video = document.getElementById("demo");
    video.oncanplaythrough = function () {
      video.muted = true;
      video.play();
    };
  };
  useEffect(video, []);
  const sendConfirmationEmail = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/confirmation/resend", {
      credentials: "include",

      method: "POST",
      body: JSON.stringify({ email: user.email }),
      headers,
    }).then(async (res) => {
      if (res.status >= 400 && res.status < 600) {
        const json = await res.json();
        return alert("Error: " + json.message);
      }
      return props.history.push(
        "/confirmation-email?email=" +
          user.email +
          "&continue=setting%20up%20payments"
      );
    });
  };
  const gotItButton = (
    <Button
      onClick={async () => {
        if (!user.confirmed) {
          return sendConfirmationEmail();
        }

        const link = await getLink();

        return (window.location.href = link);
      }}
      color="secondary"
      variant="contained"
      endIcon={<ArrowForwardIos color="primary"></ArrowForwardIos>}
    >
      Got it. Open Payment Setup
    </Button>
  );

  const getLink = async (newWindow) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    const link = await fetch(
      process.env.REACT_APP_BASE_URL + "/api/connectAccount/createConnect",
      {
        credentials: "include",
        method: "POST",
        headers,
      }
    )
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          alert(responseText);
          return;
        }
        const json = await response.json();

        if (response.status === 409) {
          return "/connect-success";
        }
        if (response.status >= 200 && response.status < 300) {
          return json.onboardLink;
        }
      })
      .catch(console.log);
    return link;
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        message="Copied to clipboard"
        key={"copied"}
        autoHideDuration={2300}
      />
      <div
        style={{
          width: "600px",
          margin: "2em",
          padding: "2em",
          background: "white",
        }}
      >
        <Button
          // variant="contained"
          color="primary"
          onClick={async () => {
            const res = await fetch(
              `${process.env.REACT_APP_BASE_URL}/api/aliases?user=${user._id}`,
              { credentials: "include" }
            );
            const json = await res.json();
            props.history.push("/" + json.handle);
          }}
          startIcon={<ArrowBackIosIcon />}
        >
          {" "}
          Back To Wishlist
        </Button>
        <Typography variant="h5" color="error">
          Important instructions for those in the <u>adult industry</u>:
        </Typography>
        <hr />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            //   padding: ".4em",
          }}
        >
          <Button
            onClick={async () => {
              if (!user.confirmed) {
                return sendConfirmationEmail();
              }
              const link = await getLink();
              if (!link) return;
              return (window.location.href = link);
            }}
            endIcon={<ArrowForwardIos color="primary"></ArrowForwardIos>}
            color="primary"
          >
            I'm not in the adult industry. Take me to payment setup.
          </Button>
        </div>
        <p>
          You are about to create an account with our payment processor. Please
          read the instructions before continuing.
        </p>
        <hr />
        <h2>
          Filling out the <i>"Business website"</i> field
        </h2>
        <div
          style={{
            margin: " 0 0 0 1.5em",
            padding: " 0 1em 1em 1em",
            border: "1px solid #e4e1e1",
            borderRadius: "10px",
          }}
        >
          <p>
            When you get to the field labeled <b>Business website</b>,{" "}
            <u>do NOT</u> put your business website or social media link here.
            Instead, click below the field where it says{" "}
            <b>"add product description instead"</b>.
          </p>
          <p>
            Fill the <b>Product description</b> field in with the following text
            or something similar:
            <p style={{ margin: "1.5em 2em" }}>
              <span
                style={{ color: theme.palette.primary.dark, fontSize: "1.5em" }}
              >
                <i>
                  <b id="description_example">
                    This account is to receive gifts on my gift registry on
                    wishtender.com
                  </b>
                </i>
              </span>{" "}
              <Tooltip title="copy to clip board">
                <FileCopy
                  onClick={(id) => {
                    var r = document.createRange();
                    r.selectNode(
                      document.getElementById("description_example")
                    );
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(r);
                    document.execCommand("copy");
                    window.getSelection().removeAllRanges();
                    setOpen(true);
                  }}
                  fontSize="small"
                />
              </Tooltip>
            </p>
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 0 2em 0",
            }}
          >
            {/* target="_blank"  */}
            {gotItButton}
          </div>
          <video
            id="demo"
            style={{
              width: "100%",
              padding: "1em 0",
              // border: "1px solid" + theme.palette.primary.dark,
              borderRadius: theme.spacing(2),
              boxShadow: "0 3px 9px rgba(0, 0, 0, 0.5)",
            }}
            autoplay
            muted
            controls
            loop
          >
            <source
              src="/videos/stripe_product_description_setup.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2em",
          }}
        >
          {gotItButton}
        </div>
        <hr />
        <h2>Why do I need to do this?</h2>
        <p>
          Our payment processor, Stripe, lets adult content creators use
          WishTender to process gifts. However, your NSFW business websites or
          NSFW social profiles can trigger automatic rejection on their systems.
          The system sees your business website and assumes you plan to sell the
          services displayed on your website through WishTender. Since you are
          using WishTender as a wishlist, and not to sell adult content, simply
          stating that you're creating this Stripe account to receive gifts is
          more accurate and will avoid triggering Stripe's systems.
        </p>
      </div>
    </div>
  );
});
