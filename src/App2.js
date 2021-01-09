import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PriceInput from "./components/wishlistpage/PriceInput";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Tooltip,
  InputAdornment,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { isValidPrice } from "./scripts/helpers";

const Form = (props) => {
  const [price, setPrice] = useState();
  const { register, handleSubmit, errors } = useForm();
  console.log(errors);
  console.log(price);
  const onSubmit = (data) => {
    console.log("submitted ", data);
  };
  const handleChange = (e) => {
    setPrice(e.target.value);
    // return true;
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit(props.onSubmit)}>
      <input
        ref={register({
          validate: (value) => {
            console.log(
              "validation change from ",
              price,
              value,
              isValidPrice(value)
            );
            const valid = isValidPrice(value);

            // setPrice(value); //because onChange will not run
            return valid || `${value} is not a valid price.`;
          },
        })}
        name="price"
        id="price"
        value={price || ""}
        onChange={handleChange}
      />
      {errors.price?.message}
      <input
        ref={register({
          validate: (value) => {
            const valid = isValidPrice(value);

            return valid || `${value} is not a valid price.`;
          },
        })}
        name="price"
        id="price"
        // value={props.price || ""}
        // onChange={(e) => setPrice(e.target.value)}
        onChange={handleChange}
      />
      {errors.price?.message}
      <input
        ref={register({
          validate: (value) => {
            console.log(
              "validation change from ",
              price,
              value,
              isValidPrice(value)
            );
            const valid = isValidPrice(value);

            // setPrice(value); //because onChange will not run
            return valid || `${value} is not a valid price.`;
          },
        })}
        name="price"
        id="price"
        // value={price || ""}

        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  );
};
// export default function App(props) {
//   const [price, setPrice] = useState("");

//   const handleSubmit = (data) => {
//     console.log("submitted ", data);
//   };
//   const handleChange = (e) => {
//     console.log("onchanged from ", price, e.target.value);
//     setPrice(e.target.value);
//     return true;
//   };
//   return (
//     <>
//       <Form
//         onChange={handleChange}
//         price={price}
//         onSubmit={handleSubmit}
//       ></Form>
//     </>
//   );
// }

export default function App(props) {
  const [price, setPrice] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log("submitted ", data);
  };
  const handleChange = (e) => {
    console.log("onchanged from ", price, e.target.value);
    setPrice(e.target.value);
    return true;
  };
  console.log(errors);
  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register({
            validate: (value) => {
              console.log(
                "validation change from ",
                price,
                value,
                isValidPrice(value)
              );
              const valid = isValidPrice(value);

              // setPrice(value); //because onChange will not run
              return valid || `${value} is not a valid price.`;
            },
          })}
          name="price"
          id="price"
          value={price || ""}
          onChange={handleChange}
        />
        {errors.price?.message}
        <OutlinedInput
          inputRef={register({
            validate: (value) => {
              console.log(
                "validation change from ",
                price,
                value,
                isValidPrice(value)
              );
              const valid = isValidPrice(value);

              // setPrice(value); //because onChange will not run
              return valid || `${value} is not a valid price.`;
            },
          })}
          name="price"
          id="price"
          value={price || ""}
          autoComplete="off"
          onChange={(e) => {
            console.log("onchanged from ", price, e.target.value);
            setPrice(e.target.value);
          }}
        />
        {errors.price?.message}

        <button type="submit">Update</button>
      </form>
      <Form
        onChange={handleChange}
        price={price}
        onSubmit={handleSubmit}
      ></Form>
    </>
  );
}
