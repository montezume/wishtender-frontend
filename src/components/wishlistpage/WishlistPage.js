import React from "react";
import ProfileSection from "./ProfileSection/ProfileSection";
import Wishlist from "./Wishlist";

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
function WishlistPage(props) {
  console.log(props);
  return (
    <div>
      <ProfileSection
      // bannerPicUrl={props.user.bannerPicUrl}
      // profilePicUrl={props.user.profilePicUrl}
      // displayName={props.user.displayName}
      // profileMessage={props.user.profileMessage}
      // firstName={props.user.name.first}
      />

      <Wishlist items={dummyWLItems} />
    </div>
  );
}

export default WishlistPage;
