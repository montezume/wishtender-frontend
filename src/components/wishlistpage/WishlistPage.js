import React from 'react';
import ProfileSection from './ProfileSection';
import Wishlist from './Wishlist';
import { Button } from '@material-ui/core';

function WishlistPage(props) {

    console.log(props);
    return(
        <div>
    
            <ProfileSection 
                bannerPicUrl = {props.user.bannerPicUrl}
                profilePicUrl= {props.user.profilePicUrl}
                displayName = {props.user.displayName}
                profileMessage = {props.user.profileMessage}
                firstName = {props.user.name.first}
            /> 
            <Button href="/addwish">Add A Wish</Button>
            <Wishlist items = {props.user.wishlistItems}/>
        </div>

        )
    }


export default WishlistPage;