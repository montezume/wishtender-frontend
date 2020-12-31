import React, { useState, useEffect, useContext, useRef } from "react";
import ProfileSection from "./ProfileSection/ProfileSection";
import Wishlist from "./Wishlist";
import { UserContext } from "../../contexts/UserContext";
import { fetchGet } from "../../scripts/fetchHelper";
import { useParams } from "react-router-dom";
import deep_diff from "deep-diff";

const handleRoute = "/aliases?handle_lowercased=";

function WishlistPage(props) {
  const [json, setJson] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [refreshWishlist, setRefreshWishlist] = useState(null);
  const currentUser = useContext(UserContext);
  let { alias: aliasPath } = useParams();
  console.log("rendered");

  const [isAuth, setIsAuth] = useState(null);
  const states = {
    json,
    wishlist,
    currency,
    wishlist,
    currency,
    refreshWishlist,
    currentUser,
  };
  const prev = useRef(states);
  const diff = deep_diff.diff(prev.current, props);
  if (diff) {
    console.log(diff);
  }

  useEffect(() => {
    fetchGet(`${handleRoute}${aliasPath.toLowerCase()}`, (json) => {
      console.log(json);
      setJson(json);
      setWishlist(json.wishlists[0]);
      console.log(currentUser);
      setIsAuth(currentUser?.aliases.includes(json._id) || false);
      setCurrency(json.currency);
    });
  }, [aliasPath, currentUser]);

  useEffect(() => {
    if (refreshWishlist) {
      fetchGet(`/wishlists/${wishlist._id}`, (json) => {
        console.log(json);
        setWishlist(json);
        setRefreshWishlist(false);
      });
    }
  }, [refreshWishlist]);
  return (
    <div>
      <ProfileSection isAuth={isAuth} info={json} />
      <Wishlist
        isAuth={isAuth}
        id={wishlist && wishlist._id}
        currency={currency}
        items={wishlist && wishlist.wishlistItems}
        refreshWishlist={() => {
          setRefreshWishlist(true);
        }}
      />
    </div>
  );
}

export default WishlistPage;
