import React, { useState, useEffect } from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";

function ProductImages(props) {
  let [displayImage, setDisplayImage] = useState(null);

  useEffect(() => {
    setDisplayImage(0);
  }, []);
  console.log("displayImages----------: ", props.displayImages);

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
    <div className="product_images">
      <div>
        <img
          id="product_image"
          src={props.displayImages ? props.displayImages[displayImage] : null}
        />
      </div>
      <div className="navigation">
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
  );
}

export default ProductImages;
