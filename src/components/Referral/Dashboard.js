import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import Card from "@mui/material/Card";
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import FileCopy from "@mui/icons-material/FileCopy";
import { withRouter } from "react-router";
import EarningsCard from "./EarningsCard";

export default withRouter(function Dashboard(props) {
  const [refInfo, setRefInfo] = useState();

  const [url, setUrl] = useState("https://www.wishtender.com/");
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/referrers`, {
        credentials: "include",
      })
        .then(async (res) => {
          if (res.status >= 500 && res.status < 600) {
            const text = await res.text();
            return alert(text);
          }
          if (res.status === 204) {
            alert(
              "You need to set up your referral code. You will be redirected after pressing ok."
            );
            return props.history.push("/referral/setup");
          }

          const json = await res.json();
          if (res.status >= 400 && res.status < 500) {
            if (json.errors) {
              alert(json.errors.map((msg) => msg.msg).join(" "));
            } else {
              alert(json.message);
            }
            return;
          }

          if (!json.referrerInfo.referrerCode) {
            alert(
              "You need to set up your referral code. You will be redirected after pressing ok."
            );
            return props.history.push("/referral/setup");
          }
          setRefInfo(json);
        })
        .catch((err) => {
          alert(err);
        });
    })();
  }, [props.history]);
  const copy = (id) => {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };
  const generateReferralLink = (urlPath, code, handle) => {
    if (!urlPath) return "";

    const key = "ref";
    let kvp;
    let url;
    // kvp looks like ['key1=value1', 'key2=value2', ...]
    try {
      url = new URL(urlPath);
      const params = url.pathname.slice(1).split("/");
      if (params[0].toLocaleLowerCase() === handle.toLocaleLowerCase())
        return urlPath;
      kvp = url.search.slice(1).split("&");
    } catch (err) {
      return "";
    }
    if (url.hostname.toLocaleLowerCase() !== "www.wishtender.com") {
      alert(
        "oops! You can only use urls with the hostname 'www.wishtender.com'."
      );
      setUrl("https://www.wishtender.com");
    }
    let i = 0;

    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = code;
        kvp[i] = pair.join("=");
        break;
      }
    }

    if (i >= kvp.length) {
      kvp[kvp.length] = [key, code].join("=");
    }

    // can return this or...
    let params = kvp.join("&");

    // reload page with new params
    url.search = params[0] === "&" ? params.slice(1) : params;
    return url.href;
  };
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
            <Typography
              style={{ color: "rgb(0, 79, 112)" }}
              gutterBottom
              variant="h5"
            >
              Referral Link Generator
            </Typography>
            <Typography color="textSecondary">Paste URL here</Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <form
                onSubmit={() => {}}
                style={{ width: "100%", marginBottom: "1rem" }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="link-input"
                  fullWidth
                  defaultValue={url}
                  value={url}
                  onChange={(e) => {
                    setUrl(e.currentTarget.value);
                  }}
                  helperText="Input any WishTender link to generate a referral link below. "
                  variant="outlined"
                />
              </form>
            </div>
            <div
              style={{
                background: "#e2f6fd",
                padding: "min(1em, 3vw)",
                borderRadius: ".5em",
              }}
            >
              <Typography style={{ display: "inline-block", color: "#004f70" }}>
                Generated Referral Link:
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #afd8e9",
                  padding: "0 .5em",
                  borderRadius: ".5em",
                  background: "white",
                }}
              >
                <Typography
                  style={{
                    display: "inline-block",
                    fontSize: "min(1em, 3vw)",
                  }}
                  id="referral-link"
                >
                  {generateReferralLink(
                    url,
                    refInfo?.referrerInfo?.referrerCode,
                    refInfo?.referrerHandle
                  )}
                </Typography>
                <Tooltip title={`Copy to Clipboard`}>
                  <IconButton onClick={() => copy("referral-link")} size="large">
                    <FileCopy
                      color="primary"
                      style={{ fontSize: "min(1em, 4vw)" }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                style={{
                  margin: "1.4em auto .6em",
                  display: "block",
                  width: "100%",
                }}
                onClick={() => copy("referral-link")}
              >
                Copy Link
              </Button>
            </div>
          </Card>
        </div>
        <div style={{ width: "100%" }}>
          <EarningsCard
            total={refInfo?.totalEarningsPeriod}
            referred={refInfo?.referrerInfo.referred}
            title={"Earnings This Period"}
          />
        </div>
      </div>
    </div>
  );
});
