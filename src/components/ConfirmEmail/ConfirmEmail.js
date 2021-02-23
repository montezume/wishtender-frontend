import { Button } from "@material-ui/core";
import { set } from "lodash";
import React, { useState } from "react";

export default function ConfirmEmail() {
  const [message, setMessage] = useState(null);
  const url = new URLSearchParams(window.location.search);
  const email = url.get("email");
  const error = url.get("error");
  const send = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch("/api/confirmation/resend", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers,
    }).then(async (res) => {
      if (res.status >= 400 && res.status < 500) {
        const json = await res.json();
        setMessage(json.message);
      }
      if (res.status === 201) setMessage("Sent");
    });
  };

  return (
    <div>
      <>
        <>{`A confirmation has been sent to ${email}. Please confirm your email.`}</>
        ;
        <div>
          <button onClick={send}>Resend Link to {email}</button>
        </div>
      </>
    </div>
  );
}
