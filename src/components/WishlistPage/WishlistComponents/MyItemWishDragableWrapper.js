import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import MyItem from "./MyItem";
export default function MyItemWithDraggableWrapper({
  id,
  item,
  setSelectWish,
  showCategories,
  isAuth,
  lastDragEndTime,
}) {
  const {
    listeners,
    setNodeRef,
    // transform,
    isDragging,
  } = useSortable({ id });

  const style = {
    // transform: CSS.Transform.toString(transform),

    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <MyItem
      setSelectWish={setSelectWish}
      showCategories={showCategories}
      isAuth={isAuth}
      item={item}
      ref={setNodeRef}
      style={style}
      currentlyDragging={isDragging}
      lastDragEndTime={lastDragEndTime}
      draggable={true}
      listeners={listeners}
      id={id}
    />
  );
}
