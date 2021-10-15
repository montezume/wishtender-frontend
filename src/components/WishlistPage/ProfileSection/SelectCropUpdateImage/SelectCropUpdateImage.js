import React, { useState } from "react";
import StyledDialog from "../../../common/StyledDialog/StyledDialog";
import Crop from "../../../common/Crop/Crop";
import FileInputWrapper from "../../../common/FileInputWrapper/FileInputWrapper";
/**
 * Renders a <UpdateImage /> component
 * @param  props
 * @param  props.handleUpdateImage
 * @param  props.aspect ex 2 or 2/1
 * @param  props.cropShape
 * @param  props.finalImageDimensions ex- {width: 300, height: 300}
 * @param  props.children HTML to act like button
 **/
export default function InputPic(props) {
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
      <FileInputWrapper handleNewImageSrc={handleNewImageSrc}>
        {props.children}
      </FileInputWrapper>

      {/* Dialog start */}
      <StyledDialog
        open={dialogOpen}
        ariaLabel="crop dialog"
        onClose={handleDialogClose}
      >
        <Crop
          label={props.label}
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
