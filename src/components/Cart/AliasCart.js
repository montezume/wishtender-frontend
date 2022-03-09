import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  FormHelperText,
  Checkbox,
  TableHead,
  TableRow,
  Button,
  Link,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  FormControlLabel,
  Box,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import useSmallScreen from "../../hooks/useSmallScreen";
import theme from "../../theme";
import Gift from "./Gift";
import { fetchPostJson } from "../../scripts/fetchHelper";
import DisplayPrice from "../common/DisplayPrice";
import DisplayPrice2 from "../common/DisplayPrice2";

const TenderInfoInputs = (props) => {
  const { cart, register, errors, control } = props;

  const { ref: fromLineRef, ...fromLineReg } = register("fromLine", {
    maxLength: {
      value: 60,
      message: `From line must be less than ${60 + 1} characters`,
    },
  });
  const { ref: emailRef, ...emailReg } = register("email", {
    required: "Email Required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Enter a valid e-mail address",
    },
  });
  const { ref: privateRef, ...privateReg } = register("private");
  const { ref: agreedToTACRef, ...agreedToTACReg } = register("agreedToTAC", {
    validate: (value) => {
      console.log(value);
      return value || "You must accept the Terms and Conditions to purchase.";
    },
  });

  return (
    <>
      <FormControl variant="outlined">
        <InputLabel htmlFor="fromLine">From</InputLabel>
        <OutlinedInput
          color="primary"
          variant="outlined"
          label="From"
          name="fromLine"
          id="fromLine"
          {...fromLineReg}
          inputRef={fromLineRef}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title={`Visible to ${cart.alias.aliasName}`}>
                <HelpIcon color="primary" aria-label="pricing information" />
              </Tooltip>
            </InputAdornment>
          }
        ></OutlinedInput>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="email">
          Email* <span style={{ color: "#b9b9b9" }}>Private</span>
        </InputLabel>
        <OutlinedInput
          {...emailReg}
          inputRef={emailRef}
          color="primary"
          variant="outlined"
          label="Email: Private"
          name="email"
          labelWidth={2}
          id="email"
          endAdornment={
            <InputAdornment position="end">
              <Tooltip
                title={`Your email is private and will not be seen by ${cart.alias.aliasName}. Receipts and messages from ${cart.alias.aliasName} will be relayed to this email.`}
              >
                <HelpIcon color="primary" aria-label="pricing information" />
              </Tooltip>
            </InputAdornment>
          }
        ></OutlinedInput>
        {errors.email ? (
          <FormHelperText error>{errors.email.message}</FormHelperText>
        ) : (
          <FormHelperText>Required</FormHelperText>
        )}
      </FormControl>{" "}
      <FormControl required>
        <FormControlLabel
          control={
            <Controller
              {...privateReg}
              inputRef={privateRef}
              name="private"
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
          label="Don't Publish"
        />
        <FormHelperText>
          If checked, your wisher will not be able to publish your message and
          pseudonym you provided above to their wishlist. Regardless of whether
          you check this or not, your email and personal information will always
          be private.
        </FormHelperText>
      </FormControl>
      <FormControl required>
        <FormControlLabel
          control={
            <Controller
              {...agreedToTACReg}
              inputRef={agreedToTACRef}
              name="agreedToTAC"
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
              <a target="_blank" href="files/terms-1-26-22.pdf">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a target="_blank" href="files/privacy-9-1-21.pdf">
                Privacy Policy
              </a>
            </>
          }
        />
        {errors.agreedToTAC && (
          <FormHelperText error>{errors.agreedToTAC.message}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default function AliasCart({ cart, exchangeRates }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm();
  const [message, setMessage] = useState("");
  const smallScreen = useSmallScreen();
  const checkoutCart = (data) => {
    // create stripe session and get session id
    // redirect to session in the callback
    const headers = new Headers();
    // headers.append("CSRF-Token", user.csrfToken);
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/checkout", {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify({
        alias: cart.alias._id,
        order: {
          buyerInfo: {
            email: data.email,
            fromLine: data.fromLine,
          },
          alias: cart.alias._id,
          noteToWisher: data.message,
          agreedToTAC: data.agreedToTAC,
          private: data.private || false,
        },
      }),
    })
      .then(async (res) => {
        if (res.status >= 500 && res.status < 600) {
          const text = await res.text();
          return alert(text);
        }
        const json = await res.json();

        if (res.status >= 400 && res.status < 500) {
          if (json.errors) {
            alert(json.errors.map((msg) => msg.msg).join(" "));
          } else {
            alert(json.message);
          }
        }

        if (res.status >= 200 && res.status < 300) {
          goToCheckout(json.checkoutSessionId);
        }
      })
      .catch((err) => {
        alert("Please report error: " + err);
      });
  };
  const goToCheckout = (sessionId) => {
    /* Handle any errors returns from Checkout  */
    var handleResult = function (result) {
      if (result.error) {
        alert(result.error.message);
      }
    };

    var stripe = window.Stripe(
      process.env.REACT_APP_BASE_URL === "https://api.wishtender.com"
        ? "pk_live_51HAi5vLLBOhef2QNhhHrfudI6iPcLyU4ormSu1hzexYSQqAg3uZNjDRZhEeNkvbOUweMONdLq3qhBqWUKIKMpnGN00VFBBOH8U"
        : "pk_test_51HAi5vLLBOhef2QNgeOEgpmhxfegnaTxArp0ri2QR4e7c4HxayuuHv8jWN9AzTuLKKEIztnhXgvss5P70Gs4A7kI00052oBzNQ"
    );

    stripe
      .redirectToCheckout({
        sessionId: sessionId,
      })
      .then(handleResult);
  };
  let messageLength;
  if (exchangeRates) {
    const totalPriceUSD =
      (Math.round(cart.totalPrice.float) * exchangeRates["USD"]) /
      exchangeRates[cart.alias.currency];
    messageLength = Math.round(30 + totalPriceUSD);
  } else if (!exchangeRates && cart.alias.currency === "USD") {
    messageLength = Math.round(cart.totalPrice.float) + 30;
  }
  const { ref: messageRef, ...messageReg } = register("message", {
    maxLength: {
      value: messageLength,
      message: `message must be less than ${messageLength + 1} characters`,
    },
  });

  return (
    <TableContainer
      component={Paper}
      style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}
    >
      <form onSubmit={handleSubmit(checkoutCart)}>
        <Table id={`aliasCart-${cart.alias._id}`}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>
                Wish Basket for
                <Typography component="span">{` ${cart.alias.aliasName} `}</Typography>
                <Link href={cart.alias.handle}>{`@${cart.alias.handle}`}</Link>
              </TableCell>
            </TableRow>
            {!smallScreen && (
              <TableRow>
                <TableCell>Wish</TableCell>
                <TableCell></TableCell>
                <TableCell>QTY</TableCell>
                <TableCell style={!smallScreen ? { minWidth: "133px" } : null}>
                  Subtotal
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {Object.values(cart.items).map((gift) => (
              <Gift
                screen={smallScreen && "xs"}
                gift={gift}
                exchangeRates={exchangeRates}
              />
            ))}
            <TableRow>
              {!smallScreen && (
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              )}
              <TableCell align="right">10% Fee:</TableCell>
              <TableCell>
                <div style={{ float: "right" }}>
                  {cart.totalPrice.convertedFee || cart.totalPrice.fee}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              {!smallScreen && (
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              )}
              <TableCell align="right">Total:</TableCell>
              <TableCell style={{ minWidth: "133px" }} align="right">
                <DisplayPrice2 priceObject={cart.totalPrice} type="WithFee" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <div style={{ display: "grid", gap: "1em" }}>
                  <Typography align="left">Add Message</Typography>
                  <TextField
                    style={{ width: "100%", marginTop: "8px" }}
                    id="outlined-multiline-static"
                    label="Message"
                    name="message"
                    error={messageLength - message.length < 0}
                    value={message}
                    {...messageReg}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    inputRef={messageRef}
                    multiline
                    rows={8}
                    variant="filled"
                    helperText={`This size gift allows you ${messageLength} characters. ${
                      messageLength - message.length
                    } remaining.`}
                  ></TextField>
                  {smallScreen ? (
                    <TenderInfoInputs
                      register={register}
                      errors={errors}
                      cart={cart}
                      control={control}
                    />
                  ) : (
                    <Box
                      display="flex"
                      style={{ gap: "1em", flexWrap: "wrap" }}
                    >
                      <TenderInfoInputs
                        errors={errors}
                        register={register}
                        cart={cart}
                        control={control}
                      />
                    </Box>
                  )}
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      disableElevation
                      variant="contained"
                      style={{ marginTop: "8px", float: "right" }}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </TableContainer>
  );
}
