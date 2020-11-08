import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit, errors } = useForm();
  const [success, setSuccess] = useState(0);
  // useEffect(() => {
  //   console.log("effect");
  // });

  const onSubmit = (data) => {
    console.log(data);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch("/users/registration", {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          throw new Error(responseText);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setSuccess(true);
        }
      })
      .catch(console.log);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {success ? <Redirect to="/wishlist-setup" /> : ""}
      <input
        type="text"
        placeholder="Email"
        name="email"
        ref={register({
          required: "Email Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Enter a valid e-mail address",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        type="password"
        placeholder="Password"
        name="password"
        ref={register({
          required: "Password Required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" />
    </form>
  );
}
