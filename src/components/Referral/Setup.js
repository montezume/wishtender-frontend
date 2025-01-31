import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router";
import Card from "@mui/material/Card";
import {
  TextField,
  Typography,
  FormHelperText,
  FormControl,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";

export default withRouter(function Referral(props) {
  const { user, getUser, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user.referralCode) props.history.push("/referral");
  }, [props.history, user.referralCode]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("CSRF-Token", user.csrfToken);

    fetch(process.env.REACT_APP_BASE_URL + "/api/referrers", {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          return alert(responseText);
        }
        if (response.status >= 400 && response.status < 500) {
          const res = await response.json();
          return alert(res.message);
        }
        // because a change was made to user, we need to update it
        const user = await getUser();
        setUser(user);
        props.history.push("/referral");
      })

      .catch((err) => {
        alert("Something went wrong: " + err);
      });
  };

  const { ref: codeRef, ...codeReg } = register("code", {
    required: "Code Required",
    pattern: {
      required: true,
      min: 3,
      max: 15,
      value: /^[a-zA-Z0-9]*$/i,
      message: "Code must be 3-15 characters. No punctuations or spaces.",
    },
  });

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          padding: "0.5rem",
          width: "100%",
          background: "#0000000a",
        }}
      >
        <Typography variant="h4"> Referral Dashboard</Typography>
      </div>
      <div style={{ maxWidth: "40rem", width: "100%", padding: "0 2rem" }}>
        <div style={{ width: "100%" }}>
          <Card
            style={{
              marginBottom: "15px",
              padding: "1rem",
            }}
            variant="outlined"
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Choose your referral code
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                // noValidate
                autoComplete="off"
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <FormControl>
                  <TextField
                    {...codeReg}
                    inputRef={codeRef}
                    label="Referral Code"
                    variant="outlined"
                    gutterBottom
                    error={errors.code && errors.code.message}
                    helperText={errors.code && errors.code.message}
                  />
                  <FormHelperText>
                    The code used to add on to your referral link.
                    <br /> Example: https://www.wishtender.com/?ref=<b>dash</b>
                  </FormHelperText>
                </FormControl>
                <Button variant="contained" color="primary" type="submit">
                  Set Referral Code
                </Button>
              </form>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            ></div>
          </Card>
        </div>
      </div>
    </div>
  );
});
