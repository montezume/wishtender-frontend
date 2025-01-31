import { useForm } from "react-hook-form";
import React, { useState } from "react";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import { Button, TextField, Box, useTheme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import useScreenSize from "../../hooks/useScreenSize";
import themeStyles from "../../themeStyles";
import ResponsiveDialogTitleSection from "../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection";
import ProgressButton from "../common/ProgressButton";

export default function UpdateEmail(props) {
  const theme = useTheme();

  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [reqStatus, setReqStatus] = useState(null);
  const onSubmit = async (data) => {
    setReqStatus("loading");
    const { password } = data;
    delete data.password;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/users", {
      credentials: "include",
      body: JSON.stringify({ email: data.email, password }),
      method: "PATCH",
      headers,
    })
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          setReqStatus("success");
          props.onClose();
        }
        if (res.status >= 400 && res.status < 500) {
          const json = await res.json();
          setReqStatus("error");
          if (json.errors) {
            alert(json.errors.map((msg) => msg.msg).join(" "));
          } else {
            alert(json.message);
          }
        }
        if (res.status >= 500 && res.status < 600) {
          const text = await res.text();
          setReqStatus("error");
          alert(text);
        }
      })
      .catch((err) => {
        alert(err);
        setReqStatus("error");
      });
  };

  const { ref: emailRef, ...emailReg } = register("email", {
    required: "Email Required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Enter a valid e-mail address",
    },
  });
  const { ref: passwordRef, ...passwordReg } = register("password", {
    required: "Password Required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  });
  const themeClasses = themeStyles(props);

  return (
    // <StyledDialog open={true}>
    <Box
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: screenSize === "sm" && "400px",
      }}
    >
      <ResponsiveDialogTitleSection onClose={props.onClose}>
        Update Email
      </ResponsiveDialogTitleSection>
      <Box
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",

          paddingBottom: screenSize === "sm" && theme.spacing(6),
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            gap: "1em",
            alignItems: "center",
            paddingTop: theme.spacing(3),
          }}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          id="update-profile-form"
        >
          <div
            style={{
              display: "flex",
              gap: screenSize === "xs" ? "2em" : "1em",
              height: "100%",
              flexDirection: "column",
              width: "80%",
              justifyContent: "center",
            }}
          >
            <TextField
              size="small"
              label="New Email"
              variant="outlined"
              style={{ height: "4em" }}
              autoComplete="off"
              name="email"
              helperText={errors.email && errors.email.message}
              {...emailReg}
              inputRef={emailRef}
            />

            <TextField
              size="small"
              style={{ height: "4em" }}
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              helperText={errors.password && errors.password.message}
              {...passwordReg}
              inputRef={passwordRef}
            />
          </div>
          {/* <Button
            disableElevation={true}
            className={
              screenSize === "xs"
                ? themeClasses.dialogSubmitMobile
                : themeClasses.dialogSubmit
            }
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Update Email
          </Button> */}
          <ProgressButton
            type="submit"
            loading={reqStatus === "loading"}
            success={reqStatus === "success"}
            successMessage="Successfully Updated"
            wrapperClassName={
              screenSize === "xs"
                ? themeClasses.dialogSubmitMobileProgressWrap
                : themeClasses.dialogSubmitProgressWrap
            }
            className={
              screenSize === "xs"
                ? themeClasses.dialogSubmitMobileProgress
                : themeClasses.dialogSubmitProgress
            }
          >
            Update Email
          </ProgressButton>
        </form>
      </Box>
    </Box>
    // </StyledDialog>
  );
}
