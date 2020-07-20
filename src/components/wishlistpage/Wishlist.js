import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import WishItem from './WishItem';

function Wishlist(props) {
    
    const innerGrid = props.items.map(item => {
       return (
        <Grid item xs = {6} sm = {4} md={3} lg={2} xl={1}>
            <WishItem 
                itemName = {item.itemName}
                price = {item.price}
                imageUrl= {item.imageUrl}
            />
        </Grid>
       )
    });
    
    console.log("array");


    return(
        <div className = "wishlist">

            <Grid container spacing={2}>

                    {innerGrid}


            </Grid>
        </div>
    )
}

export default Wishlist;