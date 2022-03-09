import React, { useEffect, useState, useContext } from "react";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import confettiFireWorks from "./confettiFireWorks";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Button } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import ResponsiveDialogTitleSectionWhite from "../common/StyledDialog/TopSections/ResponsiveTopTitleSectionWhite/ResponsiveDialogCloseAndTitleSectionWhite";
import { UserContext } from "../../contexts/UserContext";
const tweetIntent = (handle, rank, month) => {
  window.open(
    `https://twitter.com/intent/tweet?text=I%20was%20the%20%23${rank}%20top%20wisher%20on%20WishTender%20in%20all%20of%20${month}.%20%0a%0a%F0%9F%A5%B3%F0%9F%A5%B3%F0%9F%A5%B3%0a%0aCheck%20out%20my%20wishlist%20here%3A%20https%3A//www.wishtender.com/${handle}%20via%20%40wishtender`,
    "popup",
    "width=600,height=600"
  );
};

export default function TopWisherAlert({
  message,
  rank,
  month,
  id,
  setRankNotification,
}) {
  const { user } = useContext(UserContext);
  const [handle, setHandle] = useState();
  const [marked, setMarked] = useState();
  const [okToMark, setOkToMark] = useState();
  const [confettiInterval, setConfettiInterval] = useState();
  const onClose = async () => {
    if (!marked && okToMark) {
      markSeen();
    }
    setRankNotification(null);
    if (confettiInterval) clearInterval(confettiInterval);
  };

  const markSeen = () => {
    if (marked) return;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(
      process.env.REACT_APP_BASE_URL + "/api/notifications/seen?ids=" + id,
      {
        credentials: "include",
        method: "PATCH",
        headers,
      }
    )
      .then(async (res) => {
        setMarked(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (handle) return;
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/aliases?user=${user._id}`,
        { credentials: "include" }
      );
      const json = await res.json();
      setHandle(json.handle);
    })();
  }, [handle, user._id]);

  useEffect(() => {
    setConfettiInterval(confettiFireWorks());

    setTimeout(function () {
      setOkToMark(true);
    }, 900);

    setTimeout(function () {
      markSeen();
    }, 2000);
  }, []);
  return (
    <>
      {handle && (
        <StyledDialog
          background="linear-gradient(45deg, rgb(0 114 255), #00c4ff)"
          open={true}
          onClose={onClose}
        >
          <ResponsiveDialogTitleSectionWhite onClose={onClose}>
            {/* Add A Wish */}
          </ResponsiveDialogTitleSectionWhite>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "300px",
                width: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2em",
                textAlign: "center",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  color: "white",
                  textShadow: "0px 2px 4px #0000006b",
                }}
              >
                {message}
              </h2>
              <StarBorderIcon
                style={{ color: "yellow", fontSize: "4em" }}
              ></StarBorderIcon>

              <Button
                style={{ color: "white", marginTop: "3em" }}
                endIcon={<TwitterIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  tweetIntent(handle, rank, month);
                }}
              >
                Share
              </Button>
            </div>
          </div>
        </StyledDialog>
      )}
    </>
  );
}
