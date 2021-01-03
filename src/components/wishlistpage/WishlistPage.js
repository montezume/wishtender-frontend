import React, { useState, useEffect, useContext } from "react";
import ProfileSection from "./ProfileSection/ProfileSection";
import { UserContext } from "../../contexts/UserContext";
import { fetchGet } from "../../scripts/fetchHelper";
import { useParams } from "react-router-dom";
import useTraceUpdate from "../../scripts/useTraceUpdate";
import Wishlist from "./Wishlist";

const handleRoute = "/aliases?handle_lowercased=";

function WishlistPage(props) {
  const [alias, setAlias] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [refreshWishlist, setRefreshWishlist] = useState(null);
  const currentUser = useContext(UserContext);
  let { alias: aliasPath } = useParams();

  const states = {
    alias,
    wishlist,
    refreshWishlist,
    currentUser,
  };
  useTraceUpdate(WishlistPage.name, props, states);

  useEffect(() => {
    fetchGet(`${handleRoute}${aliasPath.toLowerCase()}`, (alias) => {
      setAlias(alias);
    });
  }, [aliasPath, currentUser]);

  useEffect(() => {
    if (refreshWishlist) {
      fetchGet(`/wishlists/${wishlist._id}`, (wishlist) => {
        setWishlist(wishlist);
        setRefreshWishlist(false);
      });
    }
  }, [refreshWishlist, wishlist?._id]);
  return (
    <div>
      <ProfileSection
        isAuth={currentUser?.aliases.includes(alias._id) || false}
        info={alias}
      />

      <Wishlist
        isAuth={currentUser?.aliases.includes(alias._id) || false}
        id={wishlist?._id || (alias?.wishlists[0] && alias.wishlists[0]._id)}
        currency={alias?.currency}
        items={
          wishlist?.wishlistItems ||
          (alias?.wishlists[0] && alias.wishlists[0].wishlistItems)
        }
        refreshWishlist={() => {
          setRefreshWishlist(true);
        }}
      />
    </div>
  );
}

export default WishlistPage;
