import React, { useState, useEffect } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import WishItem from "./WishItem";
import { Button } from "@material-ui/core";
import AddWish from "./AddWish/AddWish";
import StyledDialog from "../common/StyledDialog/StyledDialog";

function Wishlist(props) {
  const innerGrid =
    props.items &&
    props.items.map((item) => {
      return (
        <Grid item xs={6} sm={4} md={3} lg={2} xl={1} container spacing={2}>
          <WishItem
            itemName={item.itemName}
            price={item.price}
            imageUrl={item.itemImage}
          />
        </Grid>
      );
    });

  const [addWishVisible, setAddWishVisible] = useState(false);
  const [fetchWishlist, setFetchWishlist] = useState(false);

  return (
    <div className="wishlist">
      <div className="wrapper add_a_wish">
        <StyledDialog
          open={addWishVisible}
          onClose={() => setAddWishVisible(false)}
        >
          <AddWish
            // alias="5fcfc70ddd6d5626163bd201"
            wishlist={props.id}
            afterAddWish={(wish) => {
              setAddWishVisible(false);
              props.refreshWishlist();
            }}
          />
        </StyledDialog>
        <Button
          onClick={() => {
            setAddWishVisible(true);
          }}
          className="button add_a_wish"
          color="primary"
        >
          Add A Wish
        </Button>
      </div>

      <Grid container spacing={2}>
        {innerGrid}
      </Grid>
    </div>
  );
}

export default Wishlist;
