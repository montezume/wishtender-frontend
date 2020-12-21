import React, { useState, useEffect } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import WishItem from "./WishItem";
import { Button } from "@material-ui/core";
import AddWish from "./AddWish/AddWish";
import StyledDialog from "../common/StyledDialog/StyledDialog";
import EditWishForm from "./EditWishForm/EditWishForm";

function Wishlist(props) {
  const [editWish, setEditWish] = useState(null);
  const [addWishVisible, setAddWishVisible] = useState(false);

  const innerGrid =
    props.items &&
    props.items.map((item) => {
      return (
        <Grid
          key={item._id}
          item
          xs={6}
          sm={4}
          md={3}
          lg={2}
          xl={1}
          container
          spacing={2}
        >
          <div
            onClick={
              props.isAuth
                ? () => setEditWish(item)
                : "something about buying a wish"
            }
          >
            <WishItem
              itemName={item.itemName}
              price={item.price}
              imageUrl={item.itemImage}
            />
          </div>
        </Grid>
      );
    });

  return (
    <div className="wishlist">
      {editWish && (
        <StyledDialog
          onClose={() => {
            setEditWish(null);
          }}
          open={editWish ? true : false}
        >
          <EditWishForm
            info={{
              price: editWish.price,
              itemName: editWish.itemName,
              itemImage: editWish.itemImage,
            }}
            id={editWish._id}
            onClose={() => {
              setEditWish(null);
              props.refreshWishlist();
            }}
          />
        </StyledDialog>
      )}
      {props.isAuth && (
        <div className="wrapper add_a_wish">
          <StyledDialog
            open={addWishVisible}
            onClose={() => setAddWishVisible(false)}
          >
            {/* don't show unless authorized */}
            <AddWish
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
      )}

      <Grid container spacing={2}>
        {innerGrid}
      </Grid>
    </div>
  );
}

export default Wishlist;
