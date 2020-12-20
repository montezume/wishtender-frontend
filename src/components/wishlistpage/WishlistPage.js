import React, { useState, useEffect, useContext } from "react";
import ProfileSection from "./ProfileSection/ProfileSection";
import Wishlist from "./Wishlist";
import { UserContext } from "../../contexts/UserContext";
import { fetchGet } from "../../scripts/fetchHelper";
import { useParams } from "react-router-dom";

const handleRoute = "/aliases?handle_lowercased=";

function WishlistPage(props) {
  const [json, setJson] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [refreshWishlist, setRefreshWishlist] = useState(null);
  const currentUser = useContext(UserContext);
  let { alias: aliasPath } = useParams();

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetchGet(`${handleRoute}${aliasPath.toLowerCase()}`, (json) => {
      console.log(json);
      setJson(json);
      setWishlist(json.wishlists[0]);
      console.log(currentUser);
      setIsAuth(currentUser.aliases.includes(json._id));
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
        items={wishlist && wishlist.wishlistItems}
        refreshWishlist={() => {
          setRefreshWishlist(true);
        }}
      />
    </div>
  );
}

export default WishlistPage;
