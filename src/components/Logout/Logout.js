import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
export default function Logout() {
  const { register, handleSubmit, errors } = useForm();
  const [loggedOut, setLoggedOut] = useState(false);
  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch("/api/users/logout", {
      method: "POST",
    })
      .then(async (res) => {
        if (res.status === 201) {
          alert("Logout successful");
          setLoggedOut(true);
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
      {loggedOut && <Redirect to="/" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit" value="Logout" />
      </form>
    </div>
  );
}
