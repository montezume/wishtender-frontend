import React, { forwardRef, useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import WishItem from "./WishItem1";
import { Route, withRouter } from "react-router-dom";
import FileCopy from "@material-ui/icons/FileCopy";
//
import TuneIcon from "@material-ui/icons/Tune";
import Snackbar from "@material-ui/core/Snackbar";

import {
  Button,
  Chip,
  Container,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import AddWish from "./AddWish/AddWish";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import EditWishForm from "./EditWishForm/EditWishForm";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import useTraceUpdate from "../../scripts/useTraceUpdate";
import AddToCart from "./AddToCart/AddToCart";
import { withStyles } from "@material-ui/core/styles";
import useCustomStyles from "../../themeStyles";
import { WishlistContext } from "../../contexts/WishlistContext";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import useScreenSize from "../../hooks/useScreenSize";

// import arrayMove from "array-move";
// import "./styles.css";
// import { css } from "@emotion/react";
import {
  closestCenter,
  DndContext,
  // KeyboardSensor,
  // PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ArcherContainer, ArcherElement } from "react-archer";
import theme from "../../theme";
import Categories from "./Categories";

const styles = (theme) => ({
  animatedBounce: {
    animationName: "$bounce",
    animationTimingFunction: "cubic-bezier(0.280, 0.840, 0.420, 1)",
    animationDuration: "2s",
    animationIterationCount: "2",
  },
  "@keyframes bounce": {
    "0%": { transform: "scale(1,1)      translateY(0)" },
    "12%": { transform: "scale(1,1)      translateY(-5px)" },
    "30%": { transform: "scale(1,1)      translateY(0)" },
    "45%": { transform: "scale(1,1)      translateY(-5px)" },
    "60%": { transform: "scale(1,1)      translateY(0)" },
    "70%": { transform: "scale(1,1)      translateY(-5px)" },
    "80%": { transform: "scale(1,1)      translateY(0)" },
    "100%": { transform: "scale(1,1)      translateY(0) " },
  },

  animatedBreath: {
    animation: "$breath 2.7s ease-out 5 normal",
    "-webkit-font-smoothing": "antialiased",
  },

  "@keyframes breath": {
    "0%": {
      "-webkit-transform": "scale(1)",
      "-ms-transform": "scale(1)",
      transform: "scale(1)",
    },
    "50%": {
      "-webkit-transform": "scale(0.9)",
      "-ms-transform": "scale(0.9)",
      transform: "scale(0.9)",
    },
    "80%": {
      "-webkit-transform": "scale(1)",
      "-ms-transform": "scale(1)",
      transform: "scale(1)",
    },
    "100%": {
      "-webkit-transform": "scale(1)",
      "-ms-transform": "scale(1)",
      transform: "scale(1)",
    },
  },
  wishlistWrapper1: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    // alignItems: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    // flexDirection: "row",
    padding: "0 2%",

    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  addWishButton: {
    [theme.breakpoints.down("xl")]: {
      width: "10vw",
    },
    [theme.breakpoints.down("lg")]: {
      width: "15vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "22vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "28vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "-webkit-fill-available",
      marginLeft: 0,
      marginRight: 0,
    },
  },
});

const Wishlist = withRouter((props) => {
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
  const [activeId, setActiveId] = useState(null);
  const touch = isTouchDevice();

  const params = new URLSearchParams(window.location.search);
  const customClasses = useCustomStyles(props);
  // const [updateOrder, setUpdateOrder] = useState(false);
  const { setWishlist, wishlist, getWishlistAndParseWithArgs } =
    useContext(WishlistContext);
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
  }, [selectWish]);

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
  const MyItem = forwardRef(({ item, id, isAuth, ...props }, ref) => {
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
              {...props}
              ref={ref}
              key={item._id}
              id={`item-card-${item._id}`}
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              xl={1}
              container
              spacing={2}
            >
              <div
                style={{ width: "100%" }}
                onClick={() => setSelectWish(item)}
              >
                <WishItem
                  itemName={item.itemName}
                  isAuth={isAuth}
                  id={item._id}
                  price={item.price}
                  imageUrl={item.itemImage}
                  currency={item.currency}
                />
              </div>
            </Grid>
          )}
      </>
    );
  });

  const reorderItems = (ord) => {
    const itemsCopy = [...items];
    const sortingFunction = (ordr) => {
      const priceHigh = (it1, it2) => {
        return +it1.price.float < +it2.price.float ? 1 : -1;
      };
      const priceLow = (it1, it2) => {
        return +it1.price.float > +it2.price.float ? 1 : -1;
      };
      const defaultFunc = () => {};
      let sort;
      if (ordr === "priceHigh") sort = priceHigh;
      if (ordr === "priceLow") sort = priceLow;
      if (ordr === "default") sort = defaultFunc;

      return sort;
    };

    setOrderedItems(itemsCopy.sort(sortingFunction(ord)));
  };
  const innerGrid =
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
                xl={1}
                container
                spacing={2}
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
                    imageUrl={item.itemImage}
                    currency={item.currency}
                  />
                </div>
              </Grid>
            )}
        </>
      );
    });
  const MySortableItem = ({ id, item }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      // transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      // height: "100px",
      // background: "grey",
      transform: CSS.Transform.toString(transform),
      // transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <MyItem
        isAuth={props.isAuth}
        item={item}
        ref={setNodeRef}
        style={style}
        // {...attributes}
        {...listeners}
        id={id}
      />
    );
  };

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
          open={selectWish ? true : false}
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
          open={selectWish ? true : false}
          onClose={() => {
            setSelectWish(null);
          }}
          item={selectWish}
        />
      )}
      <ArcherContainer style={{ display: "grid" }}>
        <Container className={customClasses.wishlistWrapper1}>
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
                <>
                  <Tooltip title="Sort Items" placement="top">
                    <IconButton
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                      }}
                      color="primary"
                      size="large"
                    >
                      <TuneIcon style={{ fontSize: "1.3em" }}></TuneIcon>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={openOrderMenu}
                    onClose={(e) => {
                      setAnchorEl(null);
                    }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        reorderItems("default");
                        setAnchorEl(null);
                      }}
                    >
                      Default
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        reorderItems("priceHigh");
                        setAnchorEl(null);
                      }}
                    >
                      Price: High to Low
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        reorderItems("priceLow");
                        setAnchorEl(null);
                      }}
                    >
                      Price: Low to High
                    </MenuItem>
                  </Menu>
                </>
                {/* )} */}
              </div>
            </div>
            {props.isAuth && (
              <div className="wrapper add_a_wish">
                <AddWish
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
        </Container>
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

      {!touch ? (
        <DndContext
          // sensors={sensors}
          // collisionDetection={closestCenter}
          // onDragStart={(event) => {
          //   setActiveId(event.active.id);
          // }}
          onDragEnd={async ({ active, over }) => {
            if (!over) return null;
            if (active.id === over.id) return null;
            const oldIndex = items.map((item) => item.id).indexOf(active.id);
            const newIndex = items.map((item) => item.id).indexOf(over.id);
            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);
            // items state wasn't always updating in time
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            await fetch(
              `${process.env.REACT_APP_BASE_URL}/api/wishlists/${wishlist._id}`,
              {
                credentials: "include",
                method: "PATCH",
                body: JSON.stringify({
                  wishlistItems: newItems.map((i) => i._id),
                }),
                headers,
              }
            )
              .then(async (res) => {
                const newWl = await getWishlistAndParseWithArgs();
                setWishlist(newWl);
              })
              .catch((err) => alert(err));
            setActiveId(null);
          }}
        >
          <Grid container spacing={2}>
            <SortableContext
              items={orderedItems}
              strategy={rectSortingStrategy}
            >
              {orderedItems.map((item, index) => {
                return (
                  <MySortableItem
                    id={item.id}
                    isAuth={props.isAuth}
                    key={index}
                    item={item}
                    isDragging={activeId === item}
                  />
                );
              })}
            </SortableContext>
          </Grid>
          <DragOverlay>
            {activeId ? <MyItem id={activeId} /> : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <>
          <Grid container spacing={2}>
            {innerGrid}
          </Grid>
        </>
      )}
    </div>
  );
});

export default withStyles(styles)(Wishlist);
