import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@material-ui/core/Input";
import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChooseImage from "../ChooseImage";
import ProductInputs from "../ProductInputs";
import InputAdornment from "@material-ui/core/InputAdornment";
import HelpIcon from "@material-ui/icons/Help";

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

  useEffect(() => {
    setName(props.info && props.info.title);
    setPrice(props.info && props.info.price);
  }, [props.info]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    //send data to backend post wish item
    data.imageCrop = crop;
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
        style={{ flex: "3 1" }}
        variant="outlined"
        value={name}
        label="Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="price">Price</InputLabel>
        <OutlinedInput
          inputRef={register()}
          name="price"
          id="price"
          value={"$" + (price || "")}
          onChange={(e) => {
            setPrice(e.target.value.slice(1));
          }}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="The amount you'll receive to purchase your wish. Don't forget to add some money if you'd like to account for shipping & tax.">
                <HelpIcon aria-label="pricing information" />
              </Tooltip>
            </InputAdornment>
          }
          labelWidth={38}
        />
      </FormControl>

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
