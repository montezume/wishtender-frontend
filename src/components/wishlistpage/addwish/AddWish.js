import React, { useState, useEffect } from "react";
import axios from "axios";
import GetProductInfoButton from "./GetProductInfoButton.js";
import ProductInputs from "./ProductInputs.js";
import ProductImages from "./ProductImages";
import Button from "@material-ui/core/Button";
import filterOutSmallImages from "./filterImages";

//----Move to scripts??---

function AddWish() {
  const [productInfo, setProductInfo] = useState({
    price: "",
    title: "",
    currency: "",
    ogImageSrcs: [],
    imageSrcs: [],
  });
  const [filteredImages, setFilteredImages] = useState([]);
  const [retrieved, setRetrieved] = useState(null);

  function filterAndSetImages(uniqueImages) {
    filterOutSmallImages(uniqueImages, 100).then((images) => {
      setFilteredImages(images);
    });
  }

  function getProductInfo(url) {
    axios
      .post("http://localhost:4000/wishes/productInfo", { url: url })
      .then((res) => {
        const info = res.data;
        setProductInfo(info);
        const images = info.ogImageSrcs.concat(info.imageSrcs);
        if (res.data) setRetrieved("true");

        const uniqueImages = [...new Set(images)];
        filterAndSetImages(uniqueImages);
      });
  }

  return (
    <div className="wrapper product_info">
      <div className="container product_info">
        <GetProductInfoButton submit={(e) => getProductInfo(e)} />
        <ProductImages displayImages={filteredImages} />
        <ProductInputs
          name={productInfo.title}
          price={productInfo.price}
          currency={productInfo.currency}
          retrieved={retrieved}
        />
      </div>
      <Button id="add_wish_button" variant="contained" color="primary">
        + Add Wish
      </Button>
    </div>
  );
}

export default AddWish;
