import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Box, TextField, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ChooseImage from "../ChooseImage";
import PriceInput from "../../PriceInput";
import CategoryEdit from "../../EditWishForm/CategoryEdit";
import { CurrencyContext } from "../../../../contexts/CurrencyContext";
import {
  isValidPrice,
  currencyInfo,
  toSmallestUnit,
} from "../../../../scripts/helpers";
import customStyles from "../../../../themeStyles";
import useScreenSize from "../../../../hooks/useScreenSize";
import AutoDeleteInput from "./AutoDeleteInput";

/**
 * Renders a <WishForm /> component
 * @param  props
 * @param  props.info
 * @param  props.onClose
 * @param  props.disabled
 * @param  props.images
 **/
export default function WishForm(props) {
  const [categories, setCategories] = useState("");

  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: screenSize === "sm" && "center",
        flexDirection: "column",
        gap: "1em",
        flex: "auto",
      },
      add_wish_form_inputs_container: {
        width: "100%",
        display: "grid",
        gap: "1em",
      },
      button: {
        fontWeight: 900,
        color: "white",
        borderRadius: 0,
        [theme.breakpoints.down(undefined)]: {
          position: "fixed",
          left: "0",
          bottom: 0,
          width: "100%",
          zIndex: 10,
        },
      },
    };
  });
  const customClasses = customStyles(props);
  const classes = useStyles();

  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [crop, setCrop] = useState("");
  const { currency: clientCurrency } = useContext(CurrencyContext);
  useEffect(() => {
    setName(props.info && props.info.title);
    setPrice(props.info && props.info.price);
  }, [props.info]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    // if (price !== "") // not sure if we need this
    setValue("itemName", name, { shouldValidate: true });
    if (price !== "") setValue("price", price, { shouldValidate: true });
  }, [name, price, setValue]);
  useEffect(() => {
    if (categories !== "")
      setValue("categories", categories, { shouldValidate: true });
  }, [categories, setValue]);
  const onSubmit = (data) => {
    //send data to backend post wish item
    data.price = toSmallestUnit(data.price, clientCurrency);
    data.imageCrop = crop;
    props.onSubmit(data);
  };
  const { ref: itemNameRef, itemNameReg } = register("itemName");
  const { ref: priceRef, ...priceReg } = register("price", {
    validate: (value) => {
      if (!value) return `Price must not be empty`;

      console.log("validation change from ", price, value, isValidPrice(value));

      const currency = currencyInfo(clientCurrency);

      const valid = isValidPrice(value, currency.decimalPlaces);

      if (errors.price || !valid) setPrice(value);

      return valid || `${value} is not a valid price.`;
    },
  });
  const { ref: categoriesRef, ...categoriesReg } = register("categories");
  return (
    <form
      style={props.disabled ? { opacity: ".3", pointerEvents: "none" } : {}}
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        className={
          props.classes.input_container +
          " " +
          classes.add_wish_form_inputs_container
        }
      >
        <ChooseImage onImageChosen={setCrop} images={props.images} />
        <Typography>Set Wish Info</Typography>
        <TextField
          {...itemNameReg}
          inputRef={itemNameRef}
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
          onChange={(price) => {
            setPrice(price);
          }}
          register={priceReg}
          inputRef={priceRef}
          error={errors.price?.message}
          symbol={currencyInfo(clientCurrency).symbol}
          decimalPlaces={currencyInfo(clientCurrency).decimalPlaces}
        ></PriceInput>

        <CategoryEdit
          register={categoriesReg}
          inputRef={categoriesRef}
          itemCategories={categories}
          setItemCategories={setCategories}
          wishlistCategories={props.categories}
        />
        <AutoDeleteInput register={register} control={control} />
      </Box>
      <Button
        disableElevation={true}
        className={
          screenSize === "xs"
            ? customClasses.dialogSubmitMobile
            : customClasses.dialogSubmit
        }
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
