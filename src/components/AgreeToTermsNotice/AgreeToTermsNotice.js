import React, { useContext } from "react";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import { Button, Typography } from "@mui/material";
import ResponsiveDialogTitleSection from "../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection";
import { withRouter } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import links from "../common/AgreeToTerms/termsAndPrivacyLinks";
export default withRouter(function AgreeToTermsNotice(props) {
  const { user, getUser, setUser } = useContext(UserContext);

  const onClose = async (e, reason) => {
    if (reason && reason === "backdropClick")
      return alert("You must agree to the terms to continue using WishTender.");
    await agree();
  };

  const agree = () => {
    const headers = new Headers();
    headers.append("CSRF-Token", user.csrfToken);
    headers.append("Content-Type", "application/json");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/users/`, {
      method: "PATCH",
      credentials: "include",
      headers,
      body: JSON.stringify({ agreedToTerms: true }),
    })
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          setUser(await getUser());
        }
        if (res.status >= 400 && res.status < 500) {
          const json = await res.json();
          if (json.errors) {
            alert(json.errors.map((msg) => msg.msg).join(" "));
          } else {
            alert(json.message);
          }
        }
        if (res.status >= 500 && res.status < 600) {
          const text = await res.text();
          alert(text);
        }
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <>
      <StyledDialog open={true} onClose={onClose}>
        <ResponsiveDialogTitleSection>
          Terms of Service and Privacy Policy
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
          <Typography>
            Please accept our{" "}
            <a target="_blank" href={links.termsLink}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a target="_blank" href={links.privacyPolicyLink}>
              Privacy Policy
            </a>{" "}
            to continue.
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1em",
            }}
          >
            <div
              style={{
                marginTop: "3em",
                gap: "1em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={(e) => {
                  onClose();
                }}
              >
                I accept and agree
              </Button>
            </div>
          </div>
        </div>
      </StyledDialog>
    </>
  );
});
