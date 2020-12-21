import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Tooltip,
  InputAdornment,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

/**
 * Renders a <Price /> component
 * @param  props
 * @param  props.price
 * @param  props.setPrice
 * @param  props.inputRef
 * @param  props.error
 **/

export default function PriceInput(props) {
  return (
    <>
      <FormControl variant="outlined" error={props.error ? true : false}>
        <InputLabel htmlFor="price">Price</InputLabel>
        <OutlinedInput
          inputRef={props.inputRef}
          name="price"
          id="price"
          // value={formatCurrency(props.price, "en", "USD")}
          value={props.price || ""}
          autoComplete="off"
          onChange={(e) => {
            props.setPrice(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="The amount you'll receive to purchase your wish. Don't forget to add some money if you'd like to account for shipping & tax.">
                <HelpIcon aria-label="pricing information" />
              </Tooltip>
            </InputAdornment>
          }
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={38}
        />
        <FormHelperText id="price-helper-text">{props.error}</FormHelperText>
      </FormControl>
    </>
  );
}
