import React from "react";
import {
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import Grid from "@mui/material/Grid";
import MyItemWithSortableWrapper from "./MyItemWishSortableWrapper";
import MyItem from "./MyItem";
import {
  closestCenter,
  DndContext,
  // KeyboardSensor,
  // PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
export default function WishGridSortable({
  items,
  setItems,
  getWishlistAndParseWithArgs,
  setWishlist,
  wishlist,
  setActiveId,
  orderedItems,
  setSelectWish,
  isAuth,
  activeId,
  showCategories,
}) {
  return (
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
      {/* left off trying to get drag to work on mobile 
      https://5fc05e08a4a65d0021ae0bf2-pmliirrbge.chromatic.com/?path=/docs/presets-sortable-grid--drag-handle
  
      handle check pinterest for inspo
      */}
      <Grid container style={{ touchAction: "none" }} spacing={2}>
        <SortableContext
          handle
          style={{ touchAction: "none" }}
          items={orderedItems}
          strategy={rectSortingStrategy}
        >
          {orderedItems.map((item, index) => {
            return (
              <MyItemWithSortableWrapper
                setSelectWish={setSelectWish}
                showCategories={showCategories}
                style={{ touchAction: "none" }}
                id={item.id}
                isAuth={isAuth}
                key={index}
                item={item}
                isDragging={activeId === item}
              />
            );
          })}
        </SortableContext>
      </Grid>
      <DragOverlay>
        {activeId ? (
          <MyItem showCategories={showCategories} id={activeId} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
