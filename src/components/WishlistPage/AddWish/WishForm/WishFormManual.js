import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  Container,
  Box,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChooseImage from "./../ChooseImage";
import SelectCropUpdateImage from "./../../ProfileSection/SelectCropUpdateImage/SelectCropUpdateImage";

import PriceInput from "../../PriceInput";
import { CurrencyContext } from "../../../../contexts/CurrencyContext";
import {
  isValidPrice,
  currencyInfo,
  toSmallestUnit,
} from "../../../../scripts/helpers";
import customStyles from "../../../../themeStyles";
import useScreenSize from "../../../../hooks/useScreenSize";

/**
 * Renders a <WishFormManual /> component
 * @param  props
 * @param  props.info
 * @param  props.onClose
 * @param  props.disabled
 * @param  props.images
 **/
export default function WishFormManual(props) {
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
  const customClasses = customStyles(props);
  const classes = useStyles();
  const images = [
    `${process.env.REACT_APP_BASE_URL}/data/images/itemImages/piggy_bank.png`,
    `${process.env.REACT_APP_BASE_URL}/data/images/itemImages/bow.png`,
    `${process.env.REACT_APP_BASE_URL}/data/images/itemImages/shopping.png`,
  ];
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [itemImage, setItemImage] = useState(images[0]);
  const [name, setName] = useState("");
  const [url, setURL] = useState(null);
  // const [crop, setCrop] = useState("");
  const { currency: clientCurrency } = useContext(CurrencyContext);
  useEffect(() => {
    setName(props.info && props.info.title);
    setPrice(props.info && props.info.price);
  }, [props.info]);
  // useEffect(() => {
  //   console.log(price);
  // }, [price]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // setValue("url", url, { shouldValidate: true });
    setValue("itemName", name, { shouldValidate: true });
    if (price !== "") setValue("price", price, { shouldValidate: true });
  }, [name, price, setValue, url]);
  const onSubmit = (data) => {
    if (data.url === null || data.url === "") {
      delete data.url;
    }
    //send data to backend post wish item
    data.price = toSmallestUnit(data.price, clientCurrency);
    // data.imageCrop = crop;
    if (imageFile) data.image = imageFile;
    if (!imageFile && itemImage) data.itemImage = itemImage;
    props.onSubmit(data);
  };
  // console.log("props.price, ", props.info.price);
  const { ref: urlRef, urlReg } = register("url");
  const { ref: itemNameRef, itemNameReg } = register("itemName", {
    required: "Gift name required",
    // minLength: {
    //   value: 4,
    //   message: "Gift name must be at least 4 characters",
    // },
    // maxLength: {
    //   value: 4,
    //   message: "Gift name max 1 characters",
    // },
  });
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
  const handleImageUpdate = (img) => {
    setImageFile(img);
  };
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
        <Typography>Set Wish Info</Typography>

        <FormControl error={errors.email ? true : false}>
          <TextField
            autoComplete="off"
            {...itemNameReg}
            inputRef={itemNameRef}
            name="itemName"
            variant="outlined"
            value={name}
            label="Gift Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormHelperText>{errors.itemName?.message}</FormHelperText>
        </FormControl>
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
        <TextField
          autoComplete="off"
          {...urlReg}
          inputRef={urlRef}
          name="url"
          variant="outlined"
          value={url}
          label="Url (optional)"
          onChange={(e) => {
            setURL(e.target.value);
          }}
        />
        {!imageFile && (
          <ChooseImage
            noCrop={true}
            onImageChosen={(imageInfo) => {
              setItemImage(imageInfo);
            }}
            images={images}
          />
        )}
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              style={{ width: "161px" }}
              alt="product"
            />
          )}

          <SelectCropUpdateImage
            aspect={1}
            cropShape="rect"
            finalImageDimensions={{ width: 300, height: 300 }}
            handleUpdateImage={handleImageUpdate}
            label={"Gift Image"}
          >
            <p style={{ textDecoration: "underline", fontSize: ".8em" }}>
              Upload Custom Photo
            </p>
          </SelectCropUpdateImage>
        </Container>
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
