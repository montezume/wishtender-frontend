import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PriceInput from "./components/wishlistpage/PriceInput";
import { OutlinedInput } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { isValidPrice } from "./scripts/helpers";

const Form = (props) => {
  const [price, setPrice] = useState();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log("submitted ", data);
  };
  const handleChange = (e) => {
    setPrice(e.target.value);
    // return true;
  };
  return (
    <>
      <button onClick={() => setPrice("19.99.")}>
        Scrape site for item price
      </button>
      <form autoComplete="off" onSubmit={handleSubmit(props.onSubmit)}>
        <p>Price 1</p>
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
        {/* <p>Price 2</p>
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
        {errors.price?.message} */}
        <button type="submit">Update</button>
      </form>
    </>
  );
};

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
      <Form
        onChange={handleChange}
        price={price}
        onSubmit={handleSubmit}
      ></Form>
    </>
  );
}
