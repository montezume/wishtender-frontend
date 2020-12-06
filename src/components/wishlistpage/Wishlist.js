import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import WishItem from "./WishItem";
import { Button } from "@material-ui/core";

function Wishlist(props) {
  const innerGrid = props.items.map((item) => {
    return (
      <Grid item xs={6} sm={4} md={3} lg={2} xl={1} container spacing={2}>
        <WishItem
          itemName={item.itemName}
          price={item.price}
          imageUrl={item.imageUrl}
        />
      </Grid>
    );
  });

  console.log("array");

  return (
    <div className="wishlist">
      <div className="wrapper add_a_wish">
        <Button href="/addwish" className="button add_a_wish" color="primary">
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
