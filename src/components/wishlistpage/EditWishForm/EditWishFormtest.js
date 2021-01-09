import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectCropUpdateImage from "../ProfileSection/SelectCropUpdateImage/SelectCropUpdateImage";
import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PriceInput from "../PriceInput";
import { fetchPatchMulti, fetchDelete } from "../../../scripts/fetchHelper";
import StyledDialog from "../../common/StyledDialog/StyledDialog";

import {
  getSymbol,
  toCurrencyDecimals,
  isValidPrice,
  toDotDecimal,
} from "../../../scripts/helpers";

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
  const [price, setPrice] = useState("");

  useEffect(() => {
    setPrice(props.info && props.info.price);
  }, [props.info]);

  const { register, handleSubmit, errors } = useForm();

  return (
    <PriceInput
      price={props.info.price}
      setPrice={setPrice}
      inputRef={register({
        validate: (value) => {
          console.log(
            "validation change from ",
            price,
            value,
            isValidPrice(value)
          );
          const valid = isValidPrice(value);

          return valid || `${value} is not a valid price.`;
        },
      })}
      error={errors.price?.message}
      symbol={getSymbol(props.info.currency)}
    ></PriceInput>
  );
}
