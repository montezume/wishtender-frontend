import React, { useEffect, useState } from "react";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import { Button } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ResponsiveDialogTitleSection from "../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection";
import { withRouter } from "react-router";
var parse = require("html-react-parser");

export default withRouter(function CommunityNotice(props) {
  const { message, id, setCommunityNotice } = props;
  const [marked, setMarked] = useState();
  const [okToMark, setOkToMark] = useState();
  const onClose = async (e, reason) => {
    if (reason && reason === "backdropClick")
      return alert("Please click 'Got it!' at the end of the notice.");
    if (!marked && okToMark) {
      markSeen();
    }
    setCommunityNotice(null);
  };

  const markSeen = () => {
    if (marked) return;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(
      process.env.REACT_APP_BASE_URL +
        "/api/notifications/notice_seen?ids=" +
        id,
      {
        credentials: "include",
        method: "PATCH",
        headers,
      }
    )
      .then(async (res) => {
        setMarked(true);
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  useEffect(() => {
    setTimeout(function () {
      setOkToMark(true);
    }, 900);
  });

  return (
    <>
      <StyledDialog open={true} onClose={onClose}>
        <ResponsiveDialogTitleSection onClose={onClose}>
          Notice
        </ResponsiveDialogTitleSection>
        <div
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: "2em",
            flexDirection: "column",
          }}
        >
          <PriorityHighIcon
            style={{ color: "#ecb700", fontSize: "4em" }}
          ></PriorityHighIcon>
          {parse(message)}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1em",

              paddingBottom: "10em",
            }}
          >
            <Button
              style={{ marginTop: "3em" }}
              variant="outlined"
              onClick={(e) => {
                props.history.push("/faq");
              }}
            >
              Read in the FAQ
            </Button>
            <Button
              variant="contained"
              style={{ marginTop: "3em" }}
              onClick={(e) => {
                onClose();
              }}
            >
              Got it!
            </Button>
          </div>
        </div>
      </StyledDialog>
    </>
  );
});
