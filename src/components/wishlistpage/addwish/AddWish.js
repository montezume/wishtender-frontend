import React, { useState, useEffect } from "react";
import axios from "axios";
import GetProductInfoButton from "./GetProductInfoButton.js";
import ProductInputs from "./ProductInputs.js";
import ProductImages from "./ProductImages";

//----Move to scripts??---
async function getDisplayImages(images, dim) {
  const displayImages = [];
  for (const elem in images) {
    let displayImage = images[elem];
    let image = await imageDimensions(displayImage);
    if (image[0] > dim && image[1] > dim) {
      displayImages.push(displayImage);
    }
  }
  return displayImages;
}

async function imageDimensions(imgPath) {
  return new Promise((resolve) => {
    let image = new Image();
    image.src = imgPath;
    image.onload = function () {
      resolve([image.height, image.width]);
    };
  });
}
//----------------

function AddWish() {
  const [productInfo, setProductInfo] = useState({
    price: "",
    title: "",
    currency: "",
    ogImageSrcs: [],
    imageSrcs: [],
  });
  const [filteredImages, setFilteredImages] = useState([]);

  function filterAndSetImages(uniqueImages) {
    getDisplayImages(uniqueImages, 100).then((images) => {
      console.log(images);
      setFilteredImages(images);
    });
  }

  function getProductInfo(url) {
    axios
      .post("http://localhost:4000/wishes/productInfo", { url: url })
      .then((res) => {
        const info = res.data;
        console.log(info);
        setProductInfo(info);
        const images = info.ogImageSrcs.concat(info.imageSrcs);
        const uniqueImages = [...new Set(images)];
        filterAndSetImages(uniqueImages);
      });
  }

  return (
    <div className=" wrapper product_info">
      <div className="container product_info">
        <GetProductInfoButton submit={(e) => getProductInfo(e)} />
        <ProductInputs
          name={productInfo.title}
          price={productInfo.price}
          currency={productInfo.currency}
        />
        <ProductImages displayImages={filteredImages} />
      </div>
    </div>
  );
}

export default AddWish;
