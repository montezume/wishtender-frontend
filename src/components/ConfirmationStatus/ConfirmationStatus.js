import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function ConfirmationStatus() {
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);
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
        {!message ? (
          <>
            {" "}
            <>
              {!error && `Your email ${email} is confirmed`}
              <button
                onClick={() => {
                  setSuccess(true);
                }}
              >
                next
              </button>
              {success ? <Redirect to={`/wishlist-setup`} /> : ""}
            </>
            ;<>{error === "nouser" && `No account associated with ${email}`}</>;
            <>
              {error === "expired" && (
                <div>
                  This link expired.{" "}
                  <button onClick={send}>Resend Link to {email}</button>
                </div>
              )}
            </>
          </>
        ) : (
          message
        )}
      </>
    </div>
  );
}
