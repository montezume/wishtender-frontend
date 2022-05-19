import React, { useState, useContext } from "react";
import {
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  SortableContext,
} from "@dnd-kit/sortable";
import { WishlistContext } from "../../../contexts/WishlistContext";
import { changeWishlistOrder } from "./wishlistHelpers";
import Grid from "@mui/material/Grid";
import MyItemWithSortableWrapper from "./MyItemWishDragableWrapper";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import WishItemOverlay from "../WishItemOverlay";
import { Snackbar } from "@mui/material";
export default function WishGridDraggable({
  items,
  setItems,
  setActiveId,
  orderedItems,
  setOrderedItems,
  setSelectWish,
  isAuth,
  activeId,
  showCategories,
}) {
  const [lastDragEndTime, setLastDragEndTime] = useState(null);
  const wishlistContext = useContext(WishlistContext);
  const getItemCardElement = (id) => {
    const item = orderedItems[id - 1];
    const itemElement = document.getElementById("item-card-" + item._id);
    return itemElement;
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const applyDraggingStyles = (id) => {
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.mozUserSelect = "none";
    const item = getItemCardElement(id);
    item.style.zIndex = +item.style.zIndex + 1000;
  };
  const removeDraggingStyles = (id) => {
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
    document.body.style.mozUserSelect = undefined;

    const item = getItemCardElement(id);
    item.style.zIndex = +item.style.zIndex - 1000;
  };
  const sortItemsIsNotDefault = (items, orderedItems) => {
    const wishlistIdString = items.map((i) => i._id).join();
    const currentIdString = orderedItems.map((i) => i._id).join();
    return wishlistIdString !== currentIdString;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active, over }) => {
        setActiveId(active.id);
        applyDraggingStyles(active.id);
      }}
      onDragEnd={async ({ active, over }) => {
        setLastDragEndTime(Date.now());
        setActiveId(null);
        removeDraggingStyles(active.id);

        if (!over) return null;

        if (sortItemsIsNotDefault(items, orderedItems)) {
          alert("Set 'Sort Items' to 'Default' to organize your wishlist.");
          return;
        }
        await changeWishlistOrder(
          active,
          over.id,
          items,
          setItems,
          setOrderedItems,
          wishlistContext
        );
      }}
    >
      {wishlistContext.moveSucceeded && (
        <Snackbar
          open={!!wishlistContext.moveSucceeded}
          onClose={() => {
            wishlistContext.setMoveSucceeded(null);
          }}
          message={`Item moved ${
            wishlistContext.moveSucceeded === "toTop" ? "to top." : "to bottom."
          }`}
          autoHideDuration={3000}
        />
      )}
      <Grid container spacing={2}>
        <SortableContext
          // handle
          // style={{ touchAction: "none" }}
          items={orderedItems}
          strategy={rectSortingStrategy}
        >
          {orderedItems.map((item, index, arr) => {
            return (
              <MyItemWithSortableWrapper
                items={items}
                setItems={setItems}
                setOrderedItems={setOrderedItems}
                setSelectWish={setSelectWish}
                sortItemsIsNotDefault={sortItemsIsNotDefault(
                  items,
                  orderedItems
                )}
                notAllCategoriesShowing={!showCategories?.includes("All")}
                showCategories={showCategories}
                showToTop={
                  !showCategories?.includes("All")
                    ? false
                    : index + 1 < 3 && arr.length > 7
                }
                showToBottom={
                  !showCategories?.includes("All")
                    ? false
                    : index + 1 > arr.length - 2 && arr.length > 7
                }
                id={item.id}
                isAuth={isAuth}
                key={index}
                item={item}
                lastDragEndTime={lastDragEndTime}
                isDragging={activeId === item}
              />
            );
          })}
          <DragOverlay>
            {activeId ? (
              <Grid
                style={{
                  display: "grid",
                  width: "70%",
                  position: "absolute",
                  right: 0,
                }}
              >
                <WishItemOverlay
                  isAuth={orderedItems[activeId - 1].isAuth}
                  price={orderedItems[activeId - 1].price}
                  imageUrl={orderedItems[activeId - 1].itemImage}
                  itemName={orderedItems[activeId - 1].itemName}
                ></WishItemOverlay>
              </Grid>
            ) : null}
          </DragOverlay>
        </SortableContext>
      </Grid>
    </DndContext>
  );
}
