import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChooseImage from "../ChooseImage";
import PriceInput from "../../PriceInput";
import { CurrencyContext } from "../../../../contexts/CurrencyContext";

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
 * @param  props.disabled
 * @param  props.images
 **/
export default function WishForm(props) {
  const classes = useStyles();
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [crop, setCrop] = useState("");
  const clientCurrency = useContext(CurrencyContext);

  useEffect(() => {
    setName(props.info && props.info.title);
    setPrice(props.info && props.info.price);
  }, [props.info]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    //send data to backend post wish item
    data.imageCrop = crop;
    data.price = data.price.slice(1);
    props.onSubmit(data);
  };
  return (
    <form
      style={props.disabled ? { opacity: ".3", pointerEvents: "none" } : {}}
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ChooseImage onImageChosen={setCrop} images={props.images} />
      <Typography>Set Wish Info</Typography>
      <TextField
        inputRef={register()}
        name="itemName"
        variant="outlined"
        value={name}
        label="Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <PriceInput
        price={price}
        setPrice={setPrice}
        inputRef={register()}
        symbol={
          new Intl.NumberFormat("en", {
            style: "currency",
            currency: clientCurrency,
          })
            .formatToParts(1)
            .find((part) => part.type === "currency").value
        }
      ></PriceInput>

      <Button
        disableElevation={true}
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
      >
        + Add Wish
      </Button>
    </form>
  );
}
