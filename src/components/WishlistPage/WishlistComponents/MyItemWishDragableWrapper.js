import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import MyItem from "./MyItem";
export default function MyItemWithDraggableWrapper({
  id,
  item,
  setSelectWish,
  sortItemsIsNotDefault,
  notAllCategoriesShowing,
  showCategories,
  showToTop,
  showToBottom,
  isAuth,
  items,
  setOrderedItems,
  setItems,
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
      showToTop={showToTop}
      showToBottom={showToBottom}
      setSelectWish={setSelectWish}
      showCategories={showCategories}
      notAllCategoriesShowing={notAllCategoriesShowing}
      sortItemsIsNotDefault={sortItemsIsNotDefault}
      isAuth={isAuth}
      item={item}
      setItems={setItems}
      items={items}
      setOrderedItems={setOrderedItems}
      ref={sortItemsIsNotDefault || notAllCategoriesShowing ? null : setNodeRef}
      style={style}
      currentlyDragging={isDragging}
      lastDragEndTime={lastDragEndTime}
      draggable={true}
      listeners={listeners}
      id={id}
    />
  );
}
