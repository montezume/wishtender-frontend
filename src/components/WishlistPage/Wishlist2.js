import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import WishItem from "./WishItem1";
import { Route, withRouter } from "react-router-dom";
import FileCopy from "@mui/icons-material/FileCopy";
import Snackbar from "@mui/material/Snackbar";
import WishGridDraggable from "./WishlistComponents/WishGridDraggable";
import { Button, Chip, Typography } from "@mui/material";
import AddWish from "./AddWish/AddWish";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import EditWishForm from "./EditWishForm/EditWishForm";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import useTraceUpdate from "../../scripts/useTraceUpdate";
import AddToCart from "./AddToCart/AddToCart";
import withStyles from "@mui/styles/withStyles";
import useCustomStyles from "../../themeStyles";
import { WishlistContext } from "../../contexts/WishlistContext";
import { isFavorite } from "./WishlistComponents/wishlistHelpers";
// import arrayMove from "array-move";
// import "./styles.css";
// import { css } from "@emotion/react";

import { ArcherContainer, ArcherElement } from "react-archer";
import theme from "../../theme";
import Categories from "./Categories/Categories";

import styles from "./styles";

import OrderItemsMenu from "./WishlistComponents/OrderItemsMenu";

const Wishlist = withRouter((props) => {
  const [activeId, setActiveId] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const customClasses = useCustomStyles(props);
  // const [updateOrder, setUpdateOrder] = useState(false);
  const { wishlist } = useContext(WishlistContext);
  const [items, setItems] = useState(
    wishlist.wishlistItems.map((item, i) => {
      item.id = i + 1;
      return item;
    })
  );
  const [selectWish, setSelectWish] = useState(
    items.find((i) => i._id === params.get("item")) || null
  );
  // const [sortBy, setSortBy] = useState(params.get("sort") || null);
  const [orderedItems, setOrderedItems] = useState([...items]);
  // const [order, setOrder] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [copiedSnackbar, setCopiedSnackbar] = useState(null);
  const [paramCategories, setParamCategories] = useState(
    params.get("categories")?.split(",") || null
  );
  const [showCategories, setShowCategories] = useState(paramCategories || null);

  const openOrderMenu = Boolean(anchorEl);
  const [addWishVisible, setAddWishVisible] = useState(false);
  const [textStoppedBouncing, setTextStoppedBouncing] = useState(false);
  const { currency: clientCurrency } = useContext(CurrencyContext);

  const itemsVisible = (() => {
    if (!items || !showCategories) return;
    const itemsVisible = items?.filter((itm) => {
      if (showCategories.includes("All")) {
        return true;
      }
      let categorySelected = false;
      for (var i = 0; i < itm.categories.length; i++) {
        if (showCategories.indexOf(itm.categories[i]) > -1) {
          categorySelected = true;
          break;
        }
      }
      if (categorySelected) return true;
      return false;
    }).length;
    return `${itemsVisible}/${items.length}`;
  })();
  useTraceUpdate(Wishlist.name, props, {
    selectWish,
    addWishVisible,
    clientCurrency,
  });

  // useEffect(() => {
  //   if (updateOrder) {
  //     const headers = new Headers();
  //     headers.append("Content-Type", "application/json");
  //     (async () => {
  //       await fetch(
  //         `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlist._id}`,
  //         {
  //           credentials: "include",
  //           method: "PATCH",
  //           body: JSON.stringify({ wishlistItems: items.map((i) => i._id) }),
  //           headers,
  //         }
  //       )
  //         .then(async (res) => {
  //           setWishlist(await getWishlistAndParseWithArgs());
  //         })
  //         .catch((err) => alert(err));
  //     })();
  //   }
  //   setUpdateOrder(false);
  // }, [getWishlistAndParseWithArgs, items, setWishlist, wishlist._id]);
  useEffect(() => {
    const updatedItems = wishlist.wishlistItems.map((item, i) => {
      item.id = i + 1;
      return item;
    });
    setItems(updatedItems);
    setOrderedItems(updatedItems);
  }, [wishlist]);
  useEffect(() => {
    if (selectWish) {
      const updatedSelect = items.find((i) => i._id === selectWish._id);

      if (updatedSelect.price.converted !== selectWish.price.converted) {
        setSelectWish(updatedSelect);
      }
    }
  }, [items, selectWish]);

  useEffect(() => {
    if (showCategories === null || showCategories.length === 0) {
      return setShowCategories([...wishlist.categories, "All"]);
    }
    const difference = showCategories.filter(
      (x) => !wishlist.categories.includes(x) && x !== "All"
    );
    if (difference.length) {
      setShowCategories(
        showCategories.filter((el) => !difference.includes(el))
      );
    }
  }, [showCategories, wishlist.categories]);

  useEffect(() => {
    // if (selectWish === null) return;
    // showCategories.join('')
    props.history.push(
      `/${props.handle}${selectWish?._id ? `?item=${selectWish._id}` : ""}`
    );
  }, [props.handle, props.history, selectWish]);

  useEffect(() => {
    if (props.isAuth && !items.length) {
      const handleAnimationEnd = () => {
        setTextStoppedBouncing(true);
      };
      const text = document.querySelector(`#instructions`);

      text.addEventListener("animationend", handleAnimationEnd);
      return () => text.removeEventListener("animationend", handleAnimationEnd);
    }
  }, [props.isAuth, items.length]);

  const InnerGridNotSortable =
    orderedItems &&
    orderedItems.map((item, i) => {
      return (
        <>
          {showCategories &&
            (showCategories.includes("All") ||
              (() => {
                var found = false;
                for (var i = 0; i < item.categories.length; i++) {
                  if (showCategories.indexOf(item.categories[i]) > -1) {
                    found = true;
                    break;
                  }
                }
                return found;
              })()) && (
              <Grid
                key={item._id}
                id={`item-card-${item._id}`}
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                xl={2}
                container
                // spacing={2} check mobile
              >
                <div
                  style={{ width: "100%" }}
                  onClick={() => {
                    console.log("wishitem");

                    setSelectWish(item);
                  }}
                >
                  <WishItem
                    itemName={item.itemName}
                    isAuth={true}
                    price={item.price}
                    id={item._id}
                    favorite={isFavorite(item)}
                    imageUrl={item.itemImage}
                    currency={item.currency}
                  />
                </div>
              </Grid>
            )}
        </>
      );
    });

  const copyCategoriesLink = (value) => {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  return (
    <div className="wishlist" style={{ paddingBottom: "6em" }}>
      {selectWish && props.isAuth && (
        <StyledDialog
          onClose={() => {
            setSelectWish(null);
          }}
          // Looks like Safari doesn't support lookbehind yet
          // open={props.location.search.match(/(?<=\?item=)(.*)/g)}
          open={props.location.search
            ?.slice(1)
            ?.split("&")
            ?.find((query) => query.slice(0, 4) === "item")
            ?.slice(5)}
        >
          <EditWishForm
            categories={wishlist.categories}
            info={{
              price: selectWish.price.float,
              itemName: selectWish.itemName,
              itemImage: selectWish.itemImage,
              currency: selectWish.currency,
              categories: selectWish.categories,
              category: selectWish.category,
              repeatPurchases: selectWish.repeatPurchases,
            }}
            id={selectWish._id}
            onClose={(options) => {
              setSelectWish(null);
              if (options.refresh) props.refreshWishlist();
            }}
          />
        </StyledDialog>
      )}
      {/* {selectWish && !props.isAuth && (
        <AddToCart open={selectWish} onClose={() => setSelectWish(null)} item={selectWish} />
      )} */}
      {selectWish && !props.isAuth && (
        <AddToCart
          // got to item page
          // no positive lookbehind on safari yet
          // open={props.location.search.match(/(?<=\?item=)(.*)/g)}
          open={props.location.search
            ?.slice(1)
            ?.split("&")
            ?.find((query) => query.slice(0, 4) === "item")
            ?.slice(5)}
          onClose={() => {
            setSelectWish(null);
          }}
          item={selectWish}
        />
      )}
      <ArcherContainer style={{ display: "grid" }}>
        <div className={customClasses.wishlistWrapper1}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexGrow: "2",
              }}
            >
              <Typography> Wishes: {items && itemsVisible}</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignContent: "flex-start",
                  alignItems: "center",
                  gap: "4%",
                }}
              >
                {showCategories && (
                  <Categories
                    isAuth={props.isAuth}
                    categories={wishlist.categories}
                    setShowCategories={setShowCategories}
                    showCategories={showCategories}
                  />
                )}
                {/* {!props.isAuth && ( */}
                <OrderItemsMenu
                  openOrderMenu={openOrderMenu}
                  setAnchorEl={setAnchorEl}
                  anchorEl={anchorEl}
                  items={items}
                  setOrderedItems={setOrderedItems}
                />
                {/* )} */}
              </div>
            </div>
            {props.isAuth && (
              <div className="wrapper add_a_wish">
                <AddWish
                  categories={wishlist.categories}
                  open={addWishVisible}
                  onClose={() => {
                    setAddWishVisible(false);
                  }}
                  wishlist={props.id}
                  currency={props.currency}
                  afterAddWish={(wish) => {
                    setAddWishVisible(false);
                    props.refreshWishlist();
                  }}
                />
                <ArcherElement id="addwish">
                  <Button
                    onClick={() => {
                      setAddWishVisible(true);
                    }}
                    className={`${customClasses.gradient} ${
                      customClasses.addWishButton
                    } ${customClasses.margin} 
                      ${
                        props.isAuth && !items.length && textStoppedBouncing
                          ? customClasses.animatedBreath
                          : ""
                      }`}
                    color="primary"
                    disableElevation
                    variant="contained"
                    style={{ fontWeight: 600, minWidth: "250px" }}
                  >
                    Add A Wish
                  </Button>
                </ArcherElement>
              </div>
            )}
          </div>

          {showCategories && !showCategories.includes("All") && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: ".5em",
                width: "100%",
                alignItems: "center",
              }}
            >
              {showCategories.map((cat) => (
                <Chip
                  id={`show-chip-category-${cat}`}
                  label={cat}
                  onDelete={() => {
                    if (showCategories.length === 1)
                      return setShowCategories([...wishlist.categories, "All"]);
                    const index = showCategories.indexOf(cat);
                    let newCategories = [
                      ...showCategories.slice(0, index),
                      ...showCategories.slice(index + 1),
                    ];

                    setShowCategories(newCategories);
                  }}
                ></Chip>
              ))}
              {props.isAuth && (
                <>
                  {/* <div
                    // style={{ display: "none" }}
                    id="categories-link"
                  >{`https://www.wishtender.com/${
                    props.handle
                  }?categories=${showCategories.join(",")}`}</div> */}
                  <Button
                    color="primary"
                    onClick={() => {
                      copyCategoriesLink(
                        `https://www.wishtender.com/${
                          props.handle
                        }?categories=${showCategories.join(",")}`
                      );
                      setCopiedSnackbar(true);
                    }}
                    endIcon={<FileCopy />}
                  >
                    Copy link to these categories
                  </Button>
                  <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={copiedSnackbar}
                    onClose={() => {
                      setCopiedSnackbar(false);
                    }}
                    message="Copied to clipboard"
                    key={"copied"}
                    autoHideDuration={2300}
                  />
                </>
              )}
            </div>
          )}
        </div>
        {props.isAuth && !items.length && (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              marginTop: "6vh",
              alignItems: "center",
            }}
          >
            <ArcherElement
              svgContainerStyle={{
                padding: "20px",
                border: "1px solid red",
              }}
              id="root"
              relations={[
                {
                  targetId: "addwish",
                  targetAnchor: "bottom",
                  sourceAnchor: "top",
                  style: {
                    lineStyle: "curve",
                    strokeWidth: "4",
                    strokeColor: theme.palette.primary.dark,
                  },
                },
              ]}
            >
              <div
                id="instructions"
                className={customClasses.animatedBounce}
                style={{
                  width: "fit-content",
                  position: "relative",
                  marginLeft: "20vw",
                  fontSize: "clamp(.6em, 3vw, 1em)",
                  display: "flex",
                  flexDirection: "column",
                  color: "grey",
                }}
              >
                Find a URL of a product you want, then
                <span
                  style={{
                    fontSize: "clamp(1.6em, 4vw, 4em)",
                    color: "black",
                  }}
                >
                  Add a wish
                </span>
              </div>
            </ArcherElement>
          </div>
        )}
      </ArcherContainer>

      {props.isAuth ? (
        <WishGridDraggable
          items={items}
          setItems={setItems}
          setActiveId={setActiveId}
          orderedItems={orderedItems}
          setOrderedItems={setOrderedItems}
          setSelectWish={setSelectWish}
          isAuth={props.isAuth}
          activeId={activeId}
          showCategories={showCategories}
        />
      ) : (
        <>
          <Grid container spacing={2}>
            {InnerGridNotSortable}
          </Grid>
        </>
      )}
    </div>
  );
});

export default withStyles(styles)(Wishlist);
