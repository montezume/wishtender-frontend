import React from "react";
import { useForm } from "react-hook-form";
export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (res) => {
        if (res.status === 201) {
          alert("Login successful");
          return;
        }
        const text = await res.text();
        alert(res.status + text);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          ref={register({ required: "Email Required" })}
          type="text"
        />
        <input
          name="password"
          ref={register({ required: "Password Required" })}
          type="password"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
