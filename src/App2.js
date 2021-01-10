import React, { useState } from "react";
import { useForm } from "react-hook-form";

const isValidPrice = (value) => {
  return (
    /^(0|[1-9][0-9]{0,2}(?:(.[0-9]{3})*|[0-9]*))(\,[0-9]+){0,1}$/.test(value) ||
    /^(0|[1-9][0-9]{0,2}(?:(,[0-9]{3})*|[0-9]*))(\.[0-9]+){0,1}$/.test(value)
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
  return (
    <>
      <button onClick={() => setPrice("19.99.")}>
        <span style={{ fontSize: ".7em" }}>(pretend to)</span> Scrape site for
        item price
      </button>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
        <br></br>
        Validation Errors: {errors.price?.message}
        <br></br>
        <button type="submit">Update</button>
      </form>
    </>
  );
}
