import React from "react";
import NumberFormat from "react-number-format";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Tooltip,
  InputAdornment,
  TextField,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      {...props.register}
      decimalScale={props.decimalPlaces}
      fixedDecimalScale={true}
      inputRef={inputRef}
      getInputRef={inputRef}
      onValueChange={(price) => {
        onChange(price.formattedValue);
      }}
      // thousandSeparator
      isNumericString
      // prefix="$"
    />
  );
}

/**
 * Renders a <Price /> component
 * @param  props
 * @param  props.price
 * @param  props.setPrice
 * @param  props.inputRef
 * @param  props.error
 * @param  props.currency
 **/

export default function PriceInputs(props) {
  // const [price, setPrice] = useState("");
  return (
    <FormControl variant="outlined" error={props.error ? true : false}>
      <InputLabel htmlFor="price">Price</InputLabel>
      <OutlinedInput
        label="Price"
        inputProps={{
          decimalPlaces: props.decimalPlaces,
          register: props.register,
        }}
        inputComponent={NumberFormatCustom}
        inputRef={props.inputRef}
        name="price"
        id="price"
        value={props.price}
        autoComplete="off"
        onChange={props.onChange}
        endAdornment={
          <InputAdornment position="end">
            <Tooltip title="The amount you'll receive to purchase your wish. Don't forget to add some money if you'd like to account for shipping & tax.">
              <HelpIcon aria-label="pricing information" />
            </Tooltip>
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">{props.symbol}</InputAdornment>
        }
      />
      <FormHelperText id="price-helper-text">
        {props.error ||
          "Don't forget to add to the total to cover shipping and tax."}
      </FormHelperText>
    </FormControl>
  );
}
