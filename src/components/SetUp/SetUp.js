import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch("/users/registration", {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="handle"
        name="handle"
        ref={register({
          required: "Handle required",
        })}
      />
      {errors.handle && <p>{errors.handle.message}</p>}
      <input
        type="text"
        placeholder="display name"
        name="display name"
        ref={register({
          required: "Display Name Required",
        })}
      />
      <input
        type="text"
        placeholder="Wishlist name"
        name="display name"
        ref={register({
          required: "Display Name Required",
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" />
    </form>
  );
}
