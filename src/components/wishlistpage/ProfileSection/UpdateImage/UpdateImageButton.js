import React from "react";
import StyledIconButton from "../../../common/StyledIconButton/StyledIconButton";

/**
 * Renders a <UpdateImage /> component
 * @param  props
 * @param  props.children icon
 * @param  props.handleNewImageSrc
 * @param  props.size
 * @param  props.ariaLabel
 **/
export default function UpdateImageButton(props) {
  const fileInput = React.useRef();

  return (
    <label>
      {/* Button */}
      <input
        ref={fileInput}
        type="file"
        style={{ display: "none" }}
        accept="image/x-png,image/gif,image/jpeg"
        onChange={(e) => {
          const image = e.target.files[0];
          if (image) {
            const imageURl = URL.createObjectURL(image);
            props.handleNewImageSrc(imageURl);
            e.target.value = null;
          } else {
            props.handleNewImageSrc(null);
            e.target.value = null;
          }
        }}
      />
      <StyledIconButton
        onClick={() => fileInput.current.click()}
        size={props.size || "small"}
        ariaLabel={props.ariaLabel}
      >
        {props.children}
      </StyledIconButton>
    </label>
  );
}
