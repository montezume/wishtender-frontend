import React from "react";

/**
 * Renders a <FileInputWrapper /> component
 * @param  props
 * @param  props.handleNewImageSrc
 * @param  props.children html element to act as a button
 **/
export default function FileInputWrapper(props) {
  const fileInput = React.useRef();
  const clone =
    props.children.type === "button"
      ? React.cloneElement(props.children, {
          onClick: () => {
            fileInput.current.click();
          },
        })
      : null;

  return (
    <label for={"popp"}>
      <input
        id={"popp"}
        ref={fileInput}
        type="file"
        style={{ display: "none" }}
        accept="image/x-png,image/gif,image/jpeg"
        onChange={(e) => {
          // this.fileInput.files.length === 0
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

      {clone || props.children}
    </label>
  );
}
