import React, { useState, useEffect, useContext } from "react";
import ProfileSection from "./ProfileSection/ProfileSection";
import Wishlist from "./Wishlist";
import { UserContext } from "../../contexts/UserContext";
import { fetchGet } from "../../scripts/fetchHelper";
import { useParams } from "react-router-dom";

const dummyWLItems = [
  {
    itemName: "YSL Stilettos",
    price: "1000.00",
    imageUrl: "/images/heels.png",
  },
  {
    itemName: "Reformation Dress",
    price: "300.00",
    imageUrl: "/images/dress.png",
  },
  {
    itemName: "Night Pallette",
    price: "37.00",
    imageUrl: "/images/makeup.png",
  },
];
const handleRoute = "/aliases?handle_lowercased=";

function WishlistPage(props) {
  const [json, setJson] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [refreshWishlist, setRefreshWishlist] = useState(null);
  const currentUser = useContext(UserContext);
  let { alias: aliasPath } = useParams();

  useEffect(() => {
    fetchGet(`${handleRoute}${aliasPath.toLowerCase()}`, (json) => {
      console.log(json);
      setJson(json);
      setWishlist(json.wishlists[0]);
    });
  }, [aliasPath]);

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
      <ProfileSection info={json} />

      <Wishlist
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
