import React, { useState, useEffect } from "react";
import "./ProfileSection.css";
import EditableProfileInfo from "./EditbableProfileInfo/EditableProfileInfo.js";
import EditableCoverImage from "./EditableCoverImage/EditableCoverImage";
//fake data for now
import coverPicUrl from "./banner_pic.jpg";
import profilePic from "./profilePic.jpeg";
import UpdateProfileInfo from "./UpdateProfileInfo/UpdateProfileInfo";
//change these to match your backend routes
const postImageRoute = "http://localhost:4000/image";

//fake data for now
const user = {
  coverPicUrl: coverPicUrl,
  profilePic: profilePic,
  handle: "dashie",
  // find out character limit for profile message
  wishlistMessage: "Thanks for coming to my page!",
  wishlistName: `Dashie's Wishlist`,
};
/**
 * Renders a <ProfileSection /> component
 * @param  props
 * @param  props.coverPicUrl
 * @param  props.wishlistName
 * @param  props.handle
 * @param  props.profilePic
 * @param  props.profileMessage
 */
function ProfileSection(props) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [wishlistName, setWishlistName] = useState(null);
  const [handle, setHandle] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState(null);

  useEffect(() => {
    // all of these would be set through a get request in real life using fetch
    setProfilePicture(user.profilePic);
    setCoverImage(user.coverPicUrl);
    setWishlistName(user.wishlistName);
    setHandle(user.handle);
    setWishlistMessage(user.wishlistMessage);
  }, []);

  // fetch post image
  const fetchPostImage = (image, fileName, route, setStateCallback) => {
    var fd = new FormData();
    fd.append(fileName, image);
    fetch(route, {
      method: "POST",
      body: fd,
      mode: "cors",
    })
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          throw new Error(responseText);
        }
        return response.text();
      })
      .then((img) => {
        setStateCallback(URL.createObjectURL(image));
        console.log(img + "posted to server");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  // fetch post json
  const fetchPostJson = async (data, route, setStateCallbacks) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    await fetch(route, {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("server response: ", response);
        setStateCallbacks();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  // fetch get json
  const fetchGet = async (route) => {
    await fetch(route)
      .then((res) => res.text())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  // route post /alias
  // profilePicture
  // handle

  const handleUpdateProfilePicture = (image) => {
    fetchPostImage(image, "image", postImageRoute, setProfilePicture);
  };
  const handleCheckHandleAvailability = async (handle) => {
    const available = await fetch(
      `http://localhost:4000/users?handle=${handle}`
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        return !(text === "true");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    return available;
  };
  const handleUpdateHandle = (handle) => {
    fetchPostJson({ handle }, "http://localhost:4000/alias", () => {
      setHandle(handle);
    });
  };

  // route post /wishlist update
  // coverImage
  // message
  // wishlistName
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
      ></EditableCoverImage>
      <EditableProfileInfo
        wishlistName={wishlistName}
        handle={handle}
        wishlistMessage={wishlistMessage}
        profilePic={profilePicture}
        handleUpdateProfilePicture={handleUpdateProfilePicture}
        handleUpdateWishlistMessage={handleUpdateWishlistMessage}
      ></EditableProfileInfo>

      <div className="edit_profile_button__container">
        <UpdateProfileInfo
          wishlistName={wishlistName}
          handleUpdateWishlistMessage={handleUpdateWishlistMessage}
          handle={handle}
          handleUpdateWishlistName={handleUpdateWishlistName}
          handleUpdateHandle={handleUpdateHandle}
          handleCheckHandleAvailability={handleCheckHandleAvailability}
        ></UpdateProfileInfo>
      </div>
    </div>
  );
}

export default ProfileSection;
