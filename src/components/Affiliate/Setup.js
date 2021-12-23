import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { withRouter } from "react-router";
import Card from "@material-ui/core/Card";
import {
  TextField,
  Typography,
  FormHelperText,
  FormControl,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

export default withRouter(function Affiliate(props) {
  const { user, getUser, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user.affiliateCode) props.history.push("/affiliate");
  }, [props.history, user.affiliateCode]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/affiliates", {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          throw new Error(responseText);
        }
        if (response.status >= 400 && response.status < 500) {
          const res = response.json();
          throw new Error(res.message);
        }
        const user = await getUser();
        setUser(user);
        props.history.push("/affiliate");
      })

      .catch((err) => alert("Something went wrong: " + err));
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
        <Typography variant="h4"> Affiliate Dashboard</Typography>
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
              Choose your affiliate code
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
                    label="Affiliate Code"
                    variant="outlined"
                    gutterBottom
                    error={errors.code && errors.code.message}
                    helperText={errors.code && errors.code.message}
                  />
                  <FormHelperText>
                    The code used to add on to your affiliate link.
                    <br /> Example: https://www.wishtender.com/?ref=<b>dash</b>
                  </FormHelperText>
                </FormControl>
                <Button variant="contained" color="primary" type="submit">
                  Set Affiliate Code
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
