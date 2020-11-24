import React, { useState } from "react";
import StyledDialog from "../../../common/StyledDialog/StyledDialog";
import Crop from "../../../common/Crop/Crop";
import UpdateImageButton from "./UpdateImageButton";

/**
 * Renders a <UpdateImage /> component
 * @param  props
 * @param  props.handleUpdateImage
 * @param  props.aspect ex 2 or 2/1
 * @param  props.cropShape
 * @param  props.size
 * @param  props.children
 * @param  props.ariaLabel
 * @param  props.finalImageDimensions ex- {width: 300, height: 300}
 **/
export default function InputProfilePic(props) {
  const [newImageSrc, setNewImageSrc] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleNewImageSrc = (image) => {
    setNewImageSrc(image);
    setDialogOpen(true);
  };

  return (
    <>
      <UpdateImageButton
        size={props.size}
        ariaLabel={props.ariaLabel}
        handleNewImageSrc={handleNewImageSrc}
      >
        {props.children}
      </UpdateImageButton>

      {/* Dialog start */}
      <StyledDialog
        open={dialogOpen}
        ariaLabel="crop dialog"
        onClose={handleDialogClose}
      >
        <Crop
          onClose={handleDialogClose}
          onCroppedImageCreated={props.handleUpdateImage}
          imgSrc={newImageSrc}
          cropShape={props.cropShape}
          aspect={props.aspect}
          finalImageDimensions={props.finalImageDimensions}
        ></Crop>
      </StyledDialog>
      {/* Dialog end */}
    </>
  );
}
