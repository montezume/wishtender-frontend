import React from "react";

/**
 * Renders a <UpdateImage /> component
 * @param  props
 * @param  props.handleNewImageSrc
 * @param  props.children html element to act as a button
 **/
export default function UpdateImageButton(props) {
  const fileInput = React.useRef();
  const clone = React.cloneElement(props.children, {
    onClick: () => fileInput.current.click(),
  });

  return (
    <label>
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
      {clone}
    </label>
  );
}
