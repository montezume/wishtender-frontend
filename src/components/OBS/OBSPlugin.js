import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import makeStyles from "@mui/styles/makeStyles";

import theme from "../../theme";
import { Badge, Typography } from "@mui/material";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const baseUrl = process.env.REACT_APP_BASE_URL;
const secure = baseUrl.slice(0, 5) === "https";
const wsURL = secure ? "wss" + baseUrl.slice(5) : "ws" + baseUrl.slice(4);
const prod = baseUrl === "https://api.wishtender.com/";
//test
export default function OBSPlugin(props) {
  const [height, setHeight] = useState(46);
  const [connectErrors, setConnectErrors] = useState(0);

  const [giftOpening, setGiftOpening] = useState(false);

  const useStyles = makeStyles((theme) => {
    return {
      wishlistLink: {
        position: "absolute",
        bottom: 0,
        background: "white",
        padding: ".1em .3em",
      },
      badgeObs: {
        position: "absolute",
        height: "55px",

        bottom: `${height}px`,
        width: "58px",
        zIndex: "9998",
      },
      from: { display: "inline" },
      giftTagContainer: {
        // transform: "translateY(100%)",
        bottom: `${height * 6}px`,
        left: 0,
        width: "100%",
        position: "fixed",
      },
      giftTag: {
        position: "fixed",
        // main body of tag

        // top: "50%",
        // left: "50%",
        boxShadow: "3px 5px 3px #0000004d",
        background: "#e1fdff",
        border: "#dcdcdc",
        borderRadius: "0 2px 2px 0",
        color: "#23bbce",
        display: "inline-block",
        fontSize: "20px",
        height: "40px",
        lineHeight: "40px",
        margin: "20px",
        padding: "0 10px 0 15px",

        "&:before": {
          // triangle shape on left
          borderBottom: "20px transparent solid",
          borderRight: "12px #e1fdff solid",
          borderTop: "20px transparent solid",
          content: "''",
          height: "0px",
          left: "-12px",
          position: "absolute",
          top: "0",
          width: " 0",
        },
        "&:after": {
          // "hole"
          background: "white", //hole background
          border: "2px #add solid", // hole border
          borderRadius: "50%",
          content: "''",
          height: "6px",
          left: "0",
          position: "absolute",
          width: "6px",
          top: "16px",
        },
      },
      openGift: {
        boxShadow: "3px 5px 3px #0000004d",
        opacity: "0",
        position: "fixed",
        animationName: "shoot-to-center",
        animationDuration: "5s",
        width: "13%",
        animationTimingFunction: "linear",
        // animationIterationCount: 1,
        animationIterationCount: "1",
        animationPlayState: "running,running",
      },
      openGiftBox: {
        width: "120px",
        zIndex: "9999",

        position: "fixed",
        bottom: `${height}px`,
      },
      gift: {
        "& img": {
          width: "60px",
        },
        width: "60px",
        height: "60px",
        position: "fixed",
        bottom: `${height}px`,
        zIndex: "9990",
        webkitUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        cursor: "default",
        webkitAnimationName: "snowflakes-fall,snowflakes-shake",
        webkitAnimationDuration: "6s,6s",
        webkitAnimationTimingFunction: "linear,ease-in-out",
        webkitAnimationIterationCount: "1",
        webkitAnimationPlayState: "running,running",
        animationName: "snowflakes-fall,snowflakes-shake",
        animationDuration: "6s,6s",
        animationTimingFunction: "linear,ease-in-out",
        animationIterationCount: "1",
        animationPlayState: "running,running",
      },
      ".snowflake:nth-of-type(0)": {
        left: "1%",
        webkitAnimationDelay: "0s,0s",
        animationDelay: "0s,0s",
      },
      "@global": {
        "@keyframes shoot-to-center": {
          opacity: "1",
          // "0%": { bottom: "90%" },
          // "100%": { bottom: `${height}px` },
          "0%": {
            opacity: "1",

            bottom: `${height}px`,
            left: "30px",
          },
          "14%": {
            opacity: "1",

            bottom: "50%",
            left: "50%",
            transform: "translate(-50%, 50%)",
          },
          "15%": {
            opacity: "1",
            bottom: "50%",
            left: "50%",
            transform: "translate(-50%, 50%) scale(0.5)",
          },
          "18%": {
            opacity: "1",
            bottom: "50%",
            left: "50%",
            transform: "translate(-50%, 50%) scale(2.5)",
          },
          "20%": {
            opacity: "1",
            bottom: "50%",
            left: "50%",
            transform: "translate(-50%, 50%) scale(2)",
          },

          "100%": {
            opacity: "1",
            bottom: "50%",
            left: "50%",
            transform: "translate(-50%, 50%) scale(2)",
          },
        },
        // "@webkitKeyframes shoot-to-center": {
        //   "0%": { bottom: "46px", left: "30px" },
        //   "100%": { bottom: "50%", left: "50%" },
        // },
        "@webkitKeyframes snowflakes-fall": {
          "0%": { bottom: "90%" },
          "100%": { bottom: `${height}px` },
        },
        "@keyframes snowflakes-fall": {
          "0%": { bottom: "90%" },
          "100%": { bottom: `${height}px` },
        },
        "@webkitKeyframes snowflakes-shake": {
          "0%": {
            webkitTransform: "translateX(0px)",
            transform: "translateX(0px)",
          },
          "50%": {
            webkitTransform: "translateX(30px)",
            transform: "translateX(30px)",
          },
          "100%": {
            webkitTransform: "translateX(0px)",
            transform: "translateX(0px)",
          },
        },
        "@keyframes snowflakes-shake": {
          "0%": { transform: "translateX(30px)" },
          "33%": { transform: "translateX(0px)" },
          "66%": { transform: "translateX(30px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
    };
  });
  const classes = useStyles(props);
  let { alias: aliasPath } = useParams();
  const URL = `${wsURL}?aliasPath=${aliasPath}`;

  const socket = useRef(null);
  const [giftBaskets, setGiftBaskets] = useState([]);
  const previousItems = usePrevious(giftBaskets);

  const [reconnectInterval, setReconnectInterval] = useState(null);
  const [intervalHandle, setIntervalHandle] = useState(null);

  useEffect(() => {
    // document.body.style.backgroundImage =
    // "url('https://nypost.com/wp-content/uploads/sites/2/2019/11/camgirl-main-1a.jpg?quality=80&strip=all')";
    setHeight(
      document.getElementsByClassName(classes.wishlistLink)[0].offsetHeight
    );
    connect();
    setConnectErrors(connectErrors + 1);

    return () => {
      socket.current.close();
      // socket?.close();
    };
  }, []);

  useEffect(() => {
    setReconnectInterval(2000);
    return () => window.clearInterval(intervalHandle);
  }, []);

  useEffect(() => {
    if (reconnectInterval === null) {
      window.clearInterval(intervalHandle);
    } else {
      setIntervalHandle(
        window.setInterval(() => {
          connect();
          setConnectErrors(connectErrors + 1);

          console.log("reconnecting...");
        }, reconnectInterval)
      );
    }
  }, [reconnectInterval]);

  // dev only!!!!! delete later

  // useEffect(() => {
  //   if (!prod) {
  //     if (connectErrors > 20) {
  //       console.log("too many connects");
  //       alert("too many connects");
  //       setConnectErrors(0);
  //     }
  //   }
  // }, [connectErrors]);

  function connect() {
    socket.current = new WebSocket(URL);
    socket.current.onopen = onOpen;
    socket.current.onclose = onClose;
    socket.current.onmessage = onMessage;

    setReconnectInterval(null);
  }

  useEffect(() => {
    //  if socket.current.onmessage = onMessage; is not updated every time giftBaskets updates
    // giftBaskets will be stale/ stale closure in onMessage
    socket.current.onmessage = onMessage;
  }, [socket, giftBaskets, giftOpening]);

  function onMessage(e) {
    const data = JSON.parse(e.data);
    const giftBasket = data.body;
    if (data.type === "new") {
      setGiftBaskets((prev) => [...prev, giftBasket]);
    }
    if (data.type === "seen") {
      const match = giftBaskets.find((i) => i?.id === giftBasket?.id);
      if (match) {
        setGiftOpening(match);
        setGiftBaskets(giftBaskets.filter((item) => item.id !== match.id));
      }
    }
  }

  function onOpen(e) {
    console.log("socket ready state", socket.current.readyState);
    if (socket.current.readyState === 0) return;
    socket.current.send(
      JSON.stringify({
        type: "connect",
        user: Date.now(),
      })
    );
  }

  function onClose(e) {
    setReconnectInterval(2000);
  }

  useEffect(() => {
    if (!previousItems && !giftBaskets.length) return;
    if (
      (!previousItems && giftBaskets.length) ||
      giftBaskets.length > previousItems.length
    ) {
      var audio = new Audio(
        "https://freesound.org/data/previews/446/446111_758593-lq.mp3"
      );
      //can't locate mp3, where is this pointing to?
      // var audio = new Audio("new_gift.wav");
      audio.play();
      // if it got bigger?
      confetti({
        //   zIndex: 9000,
        angle: 290,
        startVelocity: 30,
        colors: [
          theme.palette.primary.main,
          theme.palette.primary.light,
          theme.palette.secondary.main,
          theme.palette.primary.light,
        ],
        origin: {
          x: 0,
          y: 0,
        },
      });
      // if (giftBaskets.imageURL) {

      // }
    } else if (giftBaskets.length < previousItems.length) {
      const configs = {
        //   zIndex: 9000,
        angle: 50,
        startVelocity: 55,
        colors: [
          theme.palette.primary.main,
          theme.palette.primary.light,
          theme.palette.secondary.main,
          theme.palette.primary.light,
        ],
        origin: {
          x: 0.08,
          y: 0.8,
        },
      };
      giftOpening.imageURLs.forEach((gift, i) =>
        sleep(() => confetti(configs), 1300 * i + 400)
      );
      function sleep(fn, time) {
        return new Promise((resolve) => {
          // wait 3s before calling fn(par)
          setTimeout(() => resolve(fn()), time);
        });
      }

      sleep(
        () => setGiftOpening(false),
        5000 + (giftOpening.imageURLs.length - 1) * 1300
      );
    }
  }, [giftBaskets]);

  return (
    <div>
      {/* <div className={classes.giftTagContainer}>
        <div class={classes.giftTag}>
          <Typography color="primary" variant="h5" className={classes.from}>
            From: {giftOpening.isPrivate ? "Hidden" : "Bob"}
          </Typography>
        </div>
      </div>{" "} */}
      {giftBaskets.length > 0 ? (
        <Badge
          className={classes.badgeObs}
          badgeContent={giftBaskets.length}
          color="primary"
        ></Badge>
      ) : (
        ""
      )}
      {giftOpening && (
        <>
          {giftOpening.imageURLs.map((img, i) => (
            <img
              className={classes.openGift}
              alt=""
              style={{
                animationDelay: `${i * 1.3 + 0.4}s`,
              }}
              src={img}
            />
          ))}
          <img
            className={classes.openGiftBox}
            alt=""
            src="../images/giftObsShadowOpen.png"
          />
          <div className={classes.giftTagContainer}>
            <div class={classes.giftTag}>
              <Typography color="primary" variant="h5" className={classes.from}>
                From: {giftOpening.isPrivate ? "Hidden" : giftOpening.from}
              </Typography>
            </div>
          </div>
        </>
      )}
      {giftBaskets.map &&
        giftBaskets.map((item) => (
          <div className={classes.gift}>
            <img alt="" src="../images/giftObsShadow.png" />
          </div>
        ))}
      <div className={classes.wishlistLink}>
        <Typography color="textSecondary">You can buy me a gift at</Typography>{" "}
        wishtender.com/<b>{aliasPath}</b>
      </div>
    </div>
  );
}
