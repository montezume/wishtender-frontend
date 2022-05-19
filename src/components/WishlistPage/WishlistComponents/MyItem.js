import React, { forwardRef } from "react";
import Grid from "@mui/material/Grid";
import WishItem from "../WishItem1";
export default forwardRef(function MyItem(
  {
    showCategories,
    setSelectWish,
    showToTop,
    showToBottom,
    item,
    id,
    isAuth,
    sortItemsIsNotDefault,
    currentlyDragging,
    lastDragEndTime,
    listeners,
    draggable,
    items,
    setItems,
    setOrderedItems,
    notAllCategoriesShowing,
    ...props
  },
  ref
) {
  const preventEditWindowIfJustLetGoOfDrag = () => {
    if (!lastDragEndTime || Date.now() > lastDragEndTime + 250) return;
  };
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
            ref={ref} //setsNodeRef for dnd-kit
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
            <div
              style={{ width: "100%" }}
              onClick={() => {
                preventEditWindowIfJustLetGoOfDrag();
                setSelectWish(item);
              }}
            >
              <WishItem
                sortItemsIsNotDefault={sortItemsIsNotDefault}
                notAllCategoriesShowing={notAllCategoriesShowing}
                listeners={listeners}
                draggable={draggable}
                itemName={item.itemName}
                items={items}
                setItems={setItems}
                setOrderedItems={setOrderedItems}
                isAuth={isAuth}
                id={item._id}
                showToBottom={showToBottom}
                showToTop={showToTop}
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
