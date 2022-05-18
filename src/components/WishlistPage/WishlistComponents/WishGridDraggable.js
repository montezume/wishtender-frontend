import React, { useState } from "react";
import {
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  SortableContext,
  arrayMove,
} from "@dnd-kit/sortable";
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
import { display } from "@mui/system";
import WishItemOverlay from "../WishItemOverlay";
export default function WishGridDraggable({
  items,
  setItems,
  getWishlistAndParseWithArgs,
  setWishlist,
  wishlist,
  setActiveId,
  orderedItems,
  setOrderedItems,
  setSelectWish,
  isAuth,
  activeId,
  showCategories,
}) {
  const [lastDragEndTime, setLastDragEndTime] = useState(null);

  const getElement = (id) => {
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
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active, over }) => {
        setActiveId(active.id);

        const item = getElement(active.id);
        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";
        document.body.style.mozUserSelect = "none";
        item.style.zIndex = +item.style.zIndex + 1000;
      }}
      onDragEnd={async ({ active, over }) => {
        setLastDragEndTime(Date.now());
        setActiveId(null);
        const item = getElement(active.id);
        document.body.style.userSelect = "";
        document.body.style.webkitUserSelect = "";
        document.body.style.mozUserSelect = undefined;

        item.style.zIndex = +item.style.zIndex - 1000;

        const wishlistHasBeenReordered = () => {
          const wishlistIdString = items.map((i) => i._id).join();
          const currentIdString = orderedItems.map((i) => i._id).join();
          return wishlistIdString !== currentIdString;
        };
        if (wishlistHasBeenReordered()) {
          alert("Set 'Sort Items' to 'Default' to organize your wishlist.");
          return;
        }
        if (!over) return null;
        if (active.id === over.id) return null;
        const oldIndex = items.map((item) => item.id).indexOf(active.id);
        const newIndex = items.map((item) => item.id).indexOf(over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        setItems(newItems);
        setOrderedItems(newItems);

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
          // handle
          // style={{ touchAction: "none" }}
          items={orderedItems}
          strategy={rectSortingStrategy}
        >
          {orderedItems.map((item, index) => {
            return (
              <MyItemWithSortableWrapper
                setSelectWish={setSelectWish}
                showCategories={showCategories}
                // style={{ touchAction: "none" }}
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
