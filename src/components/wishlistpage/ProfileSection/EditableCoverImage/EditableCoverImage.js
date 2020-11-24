import React from "react";
import CoverImage from "../CoverImage/CoverImage";
import PhotoSizeSelectActual from "@material-ui/icons/PhotoSizeSelectActual";
import "./EditableCoverImage.css";
import UpdateImage from "../UpdateImage/UpdateImage";

/**
 * Renders a <EditableCoverImage /> component
 * @param  props
 * @param  props.handleUpdateCoverImage
 * @param  props.aspect ex 2 or 2/1
 **/
export default function EditableCoverImage(props) {
  const aspect = { w: 10, h: 3 };
  return (
    <div className="editable-cover-image">
      <CoverImage coverPicUrl={props.coverPicUrl} size="medium"></CoverImage>
      <div className="edit-image-button__container">
        <UpdateImage
          handleUpdateImage={props.handleUpdateCoverImage}
          ariaLabel="Update Cover Image"
          size="medium"
          cropShape="rect"
          aspect={aspect.w / aspect.h}
          finalImageDimensions={{ width: aspect.w * 60, height: aspect.h * 60 }}
        >
          <PhotoSizeSelectActual />
        </UpdateImage>
      </div>
    </div>
  );
}
