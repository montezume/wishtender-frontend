import React, { forwardRef, useState, useEffect, useContext } from "react";
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
import MyItem from "./MyItem";
export default function MyItemWithSortableWrapper({
  id,
  item,
  setSelectWish,
  showCategories,
  isAuth,
}) {
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
      setSelectWish={setSelectWish}
      showCategories={showCategories}
      isAuth={isAuth}
      item={item}
      ref={setNodeRef}
      style={style}
      // {...attributes}
      {...listeners}
      id={id}
    />
  );
}
