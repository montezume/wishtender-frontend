import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UpdateImage from "../ProfileSection/UpdateImage/UpdateImage";
import PhotoSizeSelectActual from "@material-ui/icons/PhotoSizeSelectActual";

import {
  Button,
  Container,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PriceInput from "../PriceInput";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "grid",
      gap: "1em",
    },
    button: {
      fontWeight: 900,
      color: "white",
      borderRadius: 0,
      [theme.breakpoints.down(450)]: {
        position: "fixed",
        left: "0",
        bottom: 0,
        width: "100%",
        zIndex: 10,
      },
    },
  };
});

/**
 * Renders a <WishForm /> component
 * @param  props
 * @param  props.info
 * @param  props.onClose
 **/
export default function EditWishForm(props) {
  const classes = useStyles();
  const [price, setPrice] = useState("");
  const [itemName, setItemName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setItemName(props.info && props.info.itemName);
    setPrice(props.info && props.info.price);
    setImage(props.info && props.info.itemImage);
  }, [props.info]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    //send data to backend post wish item
    data.price = data.price.slice(1);
    props.onSubmit(data);
  };
  return (
    <form
      style={props.disabled ? { opacity: ".3", pointerEvents: "none" } : {}}
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <UpdateImage>
        <p style={{ textDecoration: "underline", fontSize: ".8em" }}>
          Upload Custom Photo
        </p>
      </UpdateImage>
      <Container>
        <img src={image} />
        {/* crop image */}
        <label class="file">
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            aria-label="File browser example"
          />
          <p style={{ textDecoration: "underline", fontSize: ".8em" }}>
            Upload Custom Photo
          </p>
        </label>
      </Container>
      {/* <Typography>Edit Wish Info</Typography> */}
      <TextField
        inputRef={register()}
        name="itemName"
        variant="outlined"
        value={itemName}
        label="Product Name"
        onChange={(e) => {
          setItemName(e.target.value);
        }}
      />

      <PriceInput
        price={price}
        setPrice={setPrice}
        inputRef={register()}
      ></PriceInput>

      <Button
        disableElevation={true}
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
      >
        Update
      </Button>
    </form>
  );
}
