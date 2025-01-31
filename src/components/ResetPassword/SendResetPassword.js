import React, { useState, useContext } from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router";
import SendIcon from "@mui/icons-material/Send";

import { Paper, Container, Box, Typography } from "@mui/material";

import { useForm } from "react-hook-form";
import PasswordEmail from "./PasswordEmail/PasswordEmail";
import ProgressButton from "../common/ProgressButton";
export default withRouter(function SendResetPassword(props) {
  const [view, setView] = useState("send");
  const [reqStatus, setReqStatus] = useState(null);
  const smallScreen = useSmallScreen(450);
  const { user } = useContext(UserContext);
  const { handleSubmit } = useForm();
  const onSubmit = (data) => {
    setReqStatus("loading");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch(process.env.REACT_APP_BASE_URL + "/api/reset-password", {
      method: "POST",
      credentials: "include",

      // body: JSON.stringify({ email: user.email }),
      headers,
    })
      .then(async (res) => {
        if (res.status === 201) {
          setReqStatus("success");
          setView("emailSent");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      display="flex"
      style={{
        height: "100%",
        width: "100%",
        minHeight: "inherit",
        backgroundSize: "cover",
      }}
      height="20%"
      alignItems="center"
      // sx={{
      //   display: "flex",
      //   height: "100%",
      //   alignItems: "center",
      // }}
    >
      <Container
        maxWidth={"xs"}
        component={smallScreen ? "div" : Paper}
        style={
          smallScreen
            ? {
                background: "#fff",
                height: "100%",
                width: "100%",
                display: "flex",
                padding: "30px",
                minHeight: "inherit",

                flexDirection: "column",
                justifyContent: "center",
              }
            : {
                padding: "30px",
              }
        }
      >
        {view === "send" && (
          <form
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography>Reset Password</Typography>
            <Typography variant="body2" style={{ color: "grey" }}>
              Click send to have password reset instructions sent to{" "}
              {user.email}.
            </Typography>

            <ProgressButton
              color="primary"
              variant="contained"
              type="submit"
              error={reqStatus === "error"}
              success={reqStatus === "success"}
              loading={reqStatus === "loading"}
              endIcon={<SendIcon />}
            >
              Send
            </ProgressButton>
          </form>
        )}
        {view === "emailSent" && <PasswordEmail email={user.email} />}
      </Container>
    </Box>
  );
});
