import React, { useState, useEffect, useContext } from "react";
import ProfileSection from "./ProfileSection/ProfileSection";
import { UserContext } from "../../contexts/UserContext";
import { fetchGet } from "../../scripts/fetchHelper";
import { useParams } from "react-router-dom";
import useTraceUpdate from "../../scripts/useTraceUpdate";
import Wishlist from "./Wishlist";
import {
  unitToStandard,
  toCurrencyDecimals,
  parsedCookies,
  parsePrice,
} from "../../scripts/helpers";

const handleRoute = "/api/aliases?handle_lowercased=";

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
      const wl = alias.wishlists[0];
      if (wl) {
        wl.wishlistItems.forEach((item) => {
          const parsedPrice = parsePrice(item.price, item.currency);
          item.price = parsedPrice;
        });
      }
      setAlias(alias);
    });
  }, [aliasPath, currentUser]);

  useEffect(() => {
    if (refreshWishlist) {
      fetchGet(`/api/wishlists/${alias.wishlists[0]._id}`, (wishlist) => {
        wishlist.wishlistItems.forEach(
          (item) => (item.price = unitToStandard(item.price, item.currency))
        );
        setWishlist(wishlist);
        setRefreshWishlist(false);
      });
    }
  }, [refreshWishlist, wishlist?._id]);
  return (
    <div>
      {alias && currentUser !== undefined && (
        <ProfileSection
          isAuth={currentUser?.aliases.includes(alias?._id) || false}
          info={alias}
        />
      )}

      {alias && currentUser !== undefined && (
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
      )}
    </div>
  );
}

export default WishlistPage;
