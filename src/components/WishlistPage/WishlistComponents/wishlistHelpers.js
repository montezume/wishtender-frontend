import { arrayMove } from "@dnd-kit/sortable";

const changeWishlistOrder = async (
  itemMoving,
  newPositionId,
  items,
  setItems,
  setOrderedItems,
  WishlistContext
) => {
  if (itemMoving.id === newPositionId) return null;
  const oldIndex = items.map((item) => item.id).indexOf(itemMoving.id);
  const newIndex = items.map((item) => item.id).indexOf(newPositionId);
  const newItems = arrayMove(items, oldIndex, newIndex);

  setItems(newItems);
  setOrderedItems(newItems);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/wishlists/${WishlistContext.wishlist._id}`,
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
      const newWl = await WishlistContext.getWishlistAndParseWithArgs();
      WishlistContext.setWishlist(newWl);
    })
    .catch((err) => alert(err));
};

export { changeWishlistOrder };
