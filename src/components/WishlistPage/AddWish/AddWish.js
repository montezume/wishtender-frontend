import React, { useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import TabPanel from "./TabPanel";
import { Button, LinearProgress, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../theme";
import Search from "./Search.js";
import filterOutSmallImages from "./filterImages";
import WishForm from "./WishForm/WishForm";
import WishFormManual from "./WishForm/WishFormManual";
import useScreenSize from "../../../hooks/useScreenSize";
import "./AddWish.css";
import StyledDialog from "../../common/StyledDialog/StyledDialog";
import { Box } from "@material-ui/core";
import ResponsiveDialogTitleSection from "../../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection.js";

const useStyles = makeStyles((theme) => {
  return {
    progressError: {
      "& .MuiLinearProgress-bar": { backgroundColor: theme.palette.error.main },
    },
    progressSuccess: {
      "& .MuiLinearProgress-bar": { backgroundColor: "greenyellow" },
    },
  };
});
function StyledProgressBar(props) {
  const classes = useStyles(props);
  const { status } = props;

  return (
    <LinearProgress
      className={
        status === "error"
          ? classes.progressError
          : status === "success"
          ? classes.progressSuccess
          : ""
      }
      color={status === "loading" ? "secondary" : "primary"}
      variant={status === "loading" ? "indeterminate" : "determinate"}
      value={100}
    />
  );
}

function AddWish1(props) {
  const { user } = useContext(UserContext);

  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const [productInfo, setProductInfo] = useState({
    price: "",
    title: "",
    currency: "",
    ogImageSrcs: [],
    imageSrcs: [],
  });
  const useStyles = makeStyles((theme) => {
    return {
      container: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",

        paddingBottom: screenSize === "sm" && theme.spacing(3),
      },
      input_container: { padding: theme.spacing(4, 4, 1, 4) },
    };
  });
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState("url");
  const [filteredImages, setFilteredImages] = useState([]);
  const [url, setUrl] = useState(null);
  const [retrieved, setRetrieved] = useState(null);
  const [status, setStatus] = useState(null);
  function filterAndSetImages(uniqueImages) {
    filterOutSmallImages(uniqueImages, 100).then((images) => {
      setFilteredImages(images);
    });
  }

  function handleScrapeProduct(url) {
    setUrl(url);
    setStatus("loading");

    fetch(`${process.env.REACT_APP_BASE_URL}/api/wishes/productInfo?url=${url}`)
      .then(async (res) => {
        if (res.status >= 400 && res.status < 500) {
          const json = await res.json();
          alert(json.message);
        } else if (res.status >= 500 && res.status < 600) {
          const msg = await res.text();
          alert(msg);
        } else {
          const info = await res.json();
          const images = info.imageSrcs;
          delete info.imageSrcs;
          setProductInfo(info);
          if (info) {
            setRetrieved("true");
            setStatus("success");
          }

          const uniqueImages = [...new Set(images)];
          filterAndSetImages(uniqueImages);
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  }
  const postWish = async (data) => {
    if (selectedTab === "url") data.url = url;
    data.currency = props.currency;
    data.wishlist = props.wishlist;
    const fetchOptions = {
      credentials: "include",
      method: "POST",
    };
    const headers = new Headers();
    headers.append("CSRF-Token", user.csrfToken);
    if (selectedTab === "manual") {
      const fd = new FormData();
      const dataArray = Object.entries(data);

      dataArray.forEach((datum) => {
        if (datum[0] === "categories") return;
        fd.append(datum[0], datum[1]);
      });
      fetchOptions.headers = headers;
      fetchOptions.body = fd;
    } else if (selectedTab === "url") {
      headers.append("Content-Type", "application/json");
      fetchOptions.body = JSON.stringify(data);
      fetchOptions.headers = headers;
    }
    await fetch(
      process.env.REACT_APP_BASE_URL + "/api/wishlistItems",
      fetchOptions
    )
      // .then((res) => res.json())
      .then(async (response) => {
        console.log("server response: ", response);
        if (response.status >= 200 && response.status < 300) {
          props.afterAddWish(data);
        } else {
          const resp = await response.text();
          alert(resp);
        }
        clearProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearProduct = () => {
    setStatus(null);

    setRetrieved(false);
    setProductInfo({
      price: "",
      title: "",
      currency: "",
      ogImageSrcs: [],
      imageSrcs: [],
    });
    setFilteredImages([]);
  };
  return (
    <StyledDialog
      onClose={() => {
        clearProduct();
        props.onClose();
      }}
      open={props.open}
    >
      <Box
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: screenSize === "sm" && "400px",
        }}
      >
        {status && <StyledProgressBar status={status} />}

        <ResponsiveDialogTitleSection
          onClose={() => {
            clearProduct();
            props.onClose();
          }}
        >
          Add A Wish
        </ResponsiveDialogTitleSection>
        <Tabs
          centered
          onChange={(e, newValue) => {
            setSelectedTab(newValue);
          }}
          value={selectedTab}
          aria-label="basic tabs example"
        >
          <Tab value={"url"} label="From URl" />
          <Tab value={"manual"} label="Custom" />
        </Tabs>
        <TabPanel selectedTab={selectedTab} tab={"url"}>
          <div
            style={{
              height: "100%",
              flexDirection: "column",
              padding: "1em",
              background: theme.palette.secondary.light,
              width: screenSize === "sm" && "400px",
            }}
          >
            Want to add wishes faster?
            <div style={{ padding: ".5em 0 0 0" }}>
              Get the{" "}
              <Button
                style={{
                  display: "inline",
                }}
                disableElevation={true}
                href="/extension"
                variant="contained"
                color="primary"
              >
                Add To WishTender{" "}
              </Button>{" "}
              Quick Button
            </div>
          </div>
          <Box className={classes.container}>
            <Box className={classes.input_container}>
              <Search submit={(e) => handleScrapeProduct(e)} />
            </Box>

            <WishForm
              classes={classes}
              disabled={!retrieved}
              info={productInfo}
              images={filteredImages}
              onSubmit={postWish}
            />
          </Box>
        </TabPanel>
        <TabPanel selectedTab={selectedTab} tab={"manual"}>
          <Box className={classes.container}>
            <WishFormManual
              classes={classes}
              info={productInfo}
              images={filteredImages}
              onSubmit={postWish}
              manual={true}
            />
          </Box>
        </TabPanel>
      </Box>
    </StyledDialog>
  );
}

export default AddWish1;
