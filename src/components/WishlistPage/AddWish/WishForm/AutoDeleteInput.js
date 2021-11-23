import React from "react";
import {
  FormControlLabel,
  FormHelperText,
  FormControl,
  Checkbox,
} from "@material-ui/core";
import { Controller } from "react-hook-form";

export default function AutoDeleteInput({ register, control }) {
  const { ref: repeatPurchasesRef, ...repeatPurchasesReg } =
    register("repeatPurchases");

  return (
    <FormControl required component="fieldset">
      <FormControlLabel
        control={
          <Controller
            {...repeatPurchasesReg}
            inputRef={repeatPurchasesRef}
            name="repeatPurchases"
            control={control}
            defaultValue={false}
            render={(props) => (
              <Checkbox
                {...props}
                checked={props.field.value}
                onChange={(e) => {
                  props.field.onChange(e.target.checked);
                }}
              />
            )}
          />
        }
        label="Allow Repeat Purchases"
      />
      <FormHelperText>
        Check if you want repeat purchases of this gift. If unchecked, the item
        will automatically delete from your wishlist after the first purchase.
      </FormHelperText>
    </FormControl>
  );
}
