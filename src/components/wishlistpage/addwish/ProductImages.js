import React, { useState, useEffect } from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";

function ProductImages(props) {
  let [displayImage, setDisplayImage] = useState(null);
  const [loadedClassName, setLoadedClassName] = useState("not_loaded");

  useEffect(() => {
    setDisplayImage(0);
    if (props.displayImages.length > 0) setLoadedClassName("loaded");
  }, [props]);

  function move(num) {
    let newDisplayImage = displayImage + num;
    if (
      newDisplayImage > props.displayImages.length - 1 ||
      newDisplayImage < 0
    ) {
      newDisplayImage = Math.abs(
        newDisplayImage + num * -props.displayImages.length - (num == 1 ? 1 : 0)
      );
    }
    setDisplayImage(newDisplayImage);
  }

  return (
    <div className={`product_images outerContainer ${loadedClassName}`}>
      <h2>Choose Image</h2>
      <div className="product_images container">
        <img
          id="product_image"
          src={props.displayImages ? props.displayImages[displayImage] : null}
        />
        <div className="navigation container">
          <button className="navigation" onClick={() => move(-1)}>
            <IconButton>
              <NavigateBeforeIcon />
            </IconButton>
          </button>
          <button className="navigation" onClick={() => move(1)}>
            <IconButton>
              <NavigateNextIcon />
            </IconButton>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductImages;
