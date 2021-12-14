import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { displayPriceFromUnit } from "../../scripts/helpers";
import Card from "@material-ui/core/Card";
import { TextField, IconButton, Typography } from "@material-ui/core";
import FileCopy from "@material-ui/icons/FileCopy";
import { SettingsRemoteOutlined } from "@material-ui/icons";

export default function Dashboard() {
  const [total, setTotal] = useState();
  const [url, setUrl] = useState("https://www.wishtender.com/");
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/affiliates`, {
        credentials: "include",
      })
        .then(async (res) => {
          const json = await res.json();
          console.log(json);
          setTotal(json.affiliateTotal);
        })
        .catch((err) => {});
    })();
  }, []);
  const copy = (id) => {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };
  const generateAffiliateLink = (urlPath, code) => {
    if (!urlPath) return "";
    const key = "ref";
    let kvp;
    let url;
    // kvp looks like ['key1=value1', 'key2=value2', ...]
    try {
      url = new URL(urlPath);
      kvp = url.search.substr(1).split("&");
    } catch (err) {
      return "";
    }
    if (url.hostname.toLocaleLowerCase() !== "www.wishtender.com") {
      alert(
        "oops! You can only user urls with the hostname 'www.wishtender.com'."
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
            <Typography color="textSecondary">
              Generate Affiliate link
            </Typography>

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
                  helperText="Input any WishTender link to generate an affiliate link below. "
                  variant="outlined"
                />
              </form>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                style={{ display: "inline-block" }}
                id="affiliate-link"
              >
                {generateAffiliateLink(url, user.affiliateCode)}
              </Typography>
              <IconButton onClick={() => copy("affiliate-link")}>
                <FileCopy />
              </IconButton>
            </div>
          </Card>
        </div>
        <div style={{ width: "100%" }}>
          <Card style={{ padding: "1rem" }} variant="outlined">
            <Typography color="textSecondary">All time earnings</Typography>
            <Typography
              component="h1"
              variant="h4"
              color="textPrimary"
              gutterBottom
            >
              {total && displayPriceFromUnit(total, "USD", "en-us")}
            </Typography>
            {total < 0 && (
              <Typography
                gutterBottom
                style={{ marginBottom: "1rem" }}
                component="p"
                variant="body"
                color="textSecondary"
              >
                Negative earnings mean your referred users cost WishTender more
                than the profit they brought in. You don't owe anything,
                WishTender covers these costs. These costs are higher when users
                get their first purchase of the month, and usually even out over
                the month.
              </Typography>
            )}
            <Typography>{user.referred} users referred</Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}
