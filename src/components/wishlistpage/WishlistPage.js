import React from 'react';
import ProfileSection from './ProfileSection';
import Wishlist from './Wishlist';

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
    
            <Wishlist items = {props.user.wishlistItems}/>
        </div>

        )
    }


export default WishlistPage;