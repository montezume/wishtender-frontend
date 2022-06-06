import React from "react";
import {
  Checkbox,
  FormHelperText,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import links from "./termsAndPrivacyLinks";

export default function AgreeToTerms({
  register,
  control,
  errors,
  linkStyle,
  errorStyle,
}) {
  const { ref: agreedToTACRef, ...agreedToTACReg } = register("agreedToTerms", {
    validate: (value) => {
      return value || "You must accept the Terms to continue.";
    },
  });

  return (
    <FormControl required>
      <FormControlLabel
        control={
          <Controller
            {...agreedToTACReg}
            inputRef={agreedToTACRef}
            name={"agreedToTerms"}
            control={control}
            render={(props) => (
              <Checkbox
                {...props}
                checked={props.field.value || false}
                onChange={(e) => {
                  props.field.onChange(e.target.checked);
                }}
              />
            )}
          />
        }
        label={
          <>
            I agree to the{" "}
            <a style={linkStyle} target="_blank" href={links.termsLink}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a style={linkStyle} target="_blank" href={links.privacyPolicyLink}>
              Privacy Policy
            </a>
          </>
        }
      />
      {errors["agreedToTerms"] && (
        <FormHelperText style={errorStyle} error>
          {errors["agreedToTerms"].message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
