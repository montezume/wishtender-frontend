import React, { forwardRef, useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import WishItem from "../WishItem1";
export default forwardRef(function MyItem(
  {
    showCategories,
    setSelectWish,
    item,
    id,
    isAuth,
    listeners,
    draggable,
    ...props
  },
  ref
) {
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
            xl={2}
            container
          >
            <div style={{ width: "100%" }} onClick={() => setSelectWish(item)}>
              <WishItem
                listeners={listeners}
                draggable={draggable}
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
