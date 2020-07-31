import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

function CurrencyWarning(props) {
  if (props.currency !== "USD" && props.currency.length !== 0) {
    return (
      <div>
        Price populated from {props.currency}. Please make sure to convert to
        USD.
      </div>
    );
  }
}

export default function ProductInputs(props) {
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);
  const [loadedClassName, setLoadedClassName] = useState("not_loaded");
  const classes = useStyles();

  useEffect(() => {
    setName(props.name);
    setPrice(props.price);
    if (props.name) setLoadedClassName("loaded"); //wat if there is noname?
    console.log("use effect", name, "<---name");
  }, [props]);

  return (
    <div className={loadedClassName} id="product_inputs">
      <TextField
        className="input name"
        variant="outlined"
        id="name_of_product"
        value={name}
        label="Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <TextField
        className="input price"
        variant="outlined"
        id="price_of_product"
        value={"$" + price}
        label="Price"
        onChange={(e) => {
          setPrice(e.target.value.slice(1));
        }}
      />

      {CurrencyWarning(props)}
    </div>
  );
}
