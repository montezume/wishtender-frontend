import { Container, Button, Typography } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import makeStyles from "@mui/styles/makeStyles";
import styles from "./styles";
import React, { useState, useContext, useEffect } from "react";
import useScreenSize from "../../../hooks/useScreenSize";
import { UserContext } from "../../../contexts/UserContext";
import { withRouter } from "react-router";
const useStyles = makeStyles(styles);

export default withRouter(
  withStyles(styles)(function ConfirmationEmail(props) {
    const screenSize = useScreenSize({
      breakpoints: { xs: 0, sm: 600 },
      useStandard: false,
    });
    const { user, setUser, getUser } = useContext(UserContext);

    const classes = useStyles();
    const [message, setMessage] = useState(null);
    const url = new URLSearchParams(window.location.search);
    const email = url.get("email");
    const toContinue = url.get("continue");
    const send = () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
      fetch(process.env.REACT_APP_BASE_URL + "/api/confirmation/resend", {
        credentials: "include",

        method: "POST",
        body: JSON.stringify({ email }),
        headers,
      }).then(async (res) => {
        if (res.status >= 400 && res.status < 500) {
          const json = await res.json();
          setMessage(json.message);
          alert(json.message);
        }

        if (res.status === 200) {
          setMessage("Sent");
          alert("Email sent.");
        }
      });
    };

    useEffect(() => {
      const goToNext = () => {
        (async () => {
          const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/aliases?user=${user._id}`,
            { credentials: "include" }
          );
          if (res.status === 204) {
            return props.history.push("/wishlist-setup");
          }
          const json = await res.json();
          return props.history.push(json.handle);
        })();
      };
      if (!user) {
        (async () => setUser(await getUser()))();
      }
      if (user && user.confirmed) {
        goToNext();
      }
    }, [getUser, props.history, setUser, user]);

    return (
      <Container
        maxWidth="sm"
        className={classes[`container${screenSize === "xs" ? "_xs" : ""}`]}
      >
        {!toContinue && (
          <img
            style={{
              position: "relative",
              width: "60vw",
              maxWidth: "280px",
              left: "-6%",
            }}
            alt="mail graphic"
            src="images/mail_graphic.png"
          ></img>
        )}
        {/* <div> */}
        <Typography
          variant="h4"
          align="center"
          className={classes[`text1${screenSize === "xs" ? "_xs" : ""}`]}
        >
          {toContinue ? (
            <p style={{ fontSize: ".6em" }}>
              To continue {toContinue} you must complete the email confirmation
              process.
            </p>
          ) : (
            "Confirm your email."
          )}
        </Typography>
        <Typography
          className={classes[`text2${screenSize === "xs" ? "_xs" : ""}`]}
          align="center"
        >
          A confirmation has been sent to
        </Typography>
        <Typography
          className={classes[`text2${screenSize === "xs" ? "_xs" : ""}`]}
          align="center"
        >
          <b>{email}</b>
        </Typography>
        <Typography
          align="center"
          className={classes[`text2${screenSize === "xs" ? "_xs" : ""}`]}
        >
          Check your email, click the confirmation, and follow instructions to
          continue.
        </Typography>
        {/* </div> */}
        <Button
          align="center"
          color="primary"
          onClick={send}
          className={classes.button}
        >
          Resend Link
        </Button>
        {message && message}
      </Container>
    );
  })
);
