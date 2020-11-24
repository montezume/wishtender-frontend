import React from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import "./EditableProfilePicture.css";
import "../../ProfilePicture/ProfilePicture.js";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import UpdateImage from "../../UpdateImage/UpdateImage";

/**
 * Renders a <EditableProfilePicture /> component
 * @param  props
 * @param  props.handleUpdateProfilePicture
 **/
export default function EditableProfilePicture({
  profilePic,
  handleUpdateProfilePicture,
}) {
  const aspect = { w: 1, h: 1 };

  return (
    <div className="editable_profile_picture__container">
      <div className="update_profile_picture_button__container">
        <UpdateImage
          size="small"
          aspect={aspect.w / aspect.h}
          ariaLabel="Update Profile Image"
          finalImageDimensions={{
            width: aspect.w * 300,
            height: aspect.h * 300,
          }}
          handleUpdateImage={handleUpdateProfilePicture}
        >
          <PhotoCameraIcon></PhotoCameraIcon>
        </UpdateImage>
      </div>
      <ProfilePicture profilePic={profilePic}></ProfilePicture>
    </div>
  );
}
