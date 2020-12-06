import React, { useState, useEffect, useContext } from "react";
import "./ProfileSection.css";
import EditableProfileInfo from "./EditbableProfileInfo/EditableProfileInfo.js";
import EditableCoverImage from "./EditableCoverImage/EditableCoverImage";
import UpdateProfileInfo from "./UpdateProfileInfo/UpdateProfileInfo";
import { UserContext } from "../../../contexts/UserContext";
import { useParams } from "react-router-dom";
import {
  fetchPostJson,
  fetchGet,
  fetchPostImage,
} from "../../../scripts/fetchHelper";
const postImageRoute = (id) => `/alias/${id}`;
const handleRoute = "/aliases?handle=";

/**
 * Renders a <ProfileSection /> component
 * @param  props
 */
function ProfileSection(props) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [wishlistName, setWishlistName] = useState(null);
  const [handle, setHandle] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const currentUser = useContext(UserContext);
  let { alias: aliasPath } = useParams();

  useEffect(() => {
    const cb = (json) => {
      setCoverImage(`${json.wishlists[0].coverImage}`);
      setProfilePicture(`${json.profileImage}`);
      setWishlistName(json.wishlists[0].wishlistName);
      setHandle(json.handle);
      setWishlistMessage(json.wishlists[0].wishlistMessage);
      setIsAuth(currentUser ? currentUser.aliases.includes(json._id) : false);
    };
    fetchGet(`${handleRoute}${aliasPath}`, cb);
  }, [currentUser]);

  const handleUpdateProfilePicture = (image) => {
    fetchPostImage(image, "image", postImageRoute, setProfilePicture);
  };

  const handleCheckHandleAvailability = async (handle) => {
    const available = await fetch(`${handleRoute}${handle}`)
      .then((res) => {
        return res.status === 204 ? true : false;
      })
      .catch((err) => {
        console.log(`couldn't check handle availability: ${err}`);
      });
    return available;
  };
  const handleUpdateHandle = (handle) => {
    fetchPostJson({ handle }, "http://localhost:4000/alias", () => {
      setHandle(handle);
    });
  };

  const handleUpdateCoverImage = (image) => {
    fetchPostImage(image, "image", postImageRoute, setCoverImage);
  };
  const handleUpdateWishlistMessage = (wishlistMessage) => {
    fetchPostJson({ wishlistMessage }, "http://localhost:4000/wishlist", () => {
      setWishlistMessage(wishlistMessage);
    });
  };

  const handleUpdateWishlistName = (wishlistName) => {
    fetchPostJson({ wishlistName }, "http://localhost:4000/wishlist", () => {
      setWishlistName(wishlistName);
    });
  };

  return (
    <div className="profile_section">
      <EditableCoverImage
        coverPicUrl={coverImage}
        handleUpdateCoverImage={handleUpdateCoverImage}
        isAuth={isAuth}
      ></EditableCoverImage>

      <EditableProfileInfo
        wishlistName={wishlistName}
        handle={handle}
        wishlistMessage={wishlistMessage}
        profilePic={profilePicture}
        handleUpdateProfilePicture={handleUpdateProfilePicture}
        handleUpdateWishlistMessage={handleUpdateWishlistMessage}
        isAuth={isAuth}
      ></EditableProfileInfo>
      {isAuth && (
        <div className="edit_profile_button__container">
          <UpdateProfileInfo
            wishlistName={wishlistName}
            handleUpdateWishlistMessage={handleUpdateWishlistMessage}
            handle={handle}
            handleUpdateWishlistName={handleUpdateWishlistName}
            handleUpdateHandle={handleUpdateHandle}
            handleCheckHandleAvailability={handleCheckHandleAvailability}
            isAuth={isAuth}
          ></UpdateProfileInfo>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;
