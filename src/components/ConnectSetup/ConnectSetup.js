import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CountryContext } from "../../contexts/CountryContext";
import { Redirect } from "react-router-dom";

const supportedPayoutCountries = [
  "AT",
  "AU",
  "BE",
  "BG",
  "CA",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HK",
  "HU",
  "IE",
  "IN",
  "IT",
  "JP",
  "LT",
  "LU",
  "LV",
  "MT",
  "MY",
  "NL",
  "NO",
  "NZ",
  "PL",
  "PT",
  "RO",
  "SE",
  "SG",
  "SI",
  "SK",
  "US",
];

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export default function ConnectSetup() {
  const { register, handleSubmit, errors } = useForm();
  const [onboardLink, setOnboardLink] = useState(0);
  const [error, setError] = useState(null);
  const clientCountry = useContext(CountryContext);

  useEffect(() => {
    // get account info- was stripe setup?
    fetch("/api/connectAccount/currentAccount").then(async (res) => {
      const json = await res.json();
      alert(JSON.stringify(json));
    });
  }, []);
  const countrySelection = supportedPayoutCountries.map((country) =>
    clientCountry === country ? (
      <option selected value={country}>
        {regionNames?.of(country) || country}
      </option>
    ) : (
      <option value={country}>{regionNames?.of(country) || country}</option>
    )
  );
  const correctCurrency = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("/api/connectAccount/correctCurrency", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          return alert("You're account is ready to set up.");
        }
        const json = await res.json();
        alert(json.message);
      })
      .catch(console.log);
  };

  const onSubmit = (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch("/api/connectAccount/createConnect", {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    })
      .then(async (response) => {
        if (response.status === 500) {
          let responseText = await response.text();
          throw new Error(responseText);
        }
        const json = await response.json();

        if (response.status >= 200 && response.status < 300) {
          return (window.location.href = json.onboardLink);
        }
        if (response.status >= 400 && response.status < 500) {
          if (json.error === "Currency Conflict") {
            setError(
              <>
                You're Stripe account is set to {json.currency} but there are
                items in your wishlist set to a different currency. Do you want
                to convert the prices?
                <button
                  onClick={() =>
                    correctCurrency({
                      changeValue: true,
                      currency: json.currency,
                    })
                  }
                >
                  Yes. Change currency and convert prices of my wishlist items
                  based on exchange rates.
                </button>
                <button
                  onClick={() =>
                    correctCurrency({
                      changeValue: false,
                      currency: json.currency,
                    })
                  }
                >
                  No. Only change currency. I'll convert the prices myself.
                </button>
              </>
            );
          } else {
            setError(json.message);
          }
        }
        throw new Error(data.json.message);
      })
      .catch(console.log);
  };

  return (
    <>
      {onboardLink ? <Redirect to={onboardLink} /> : ""}

      <form onSubmit={handleSubmit(onSubmit)}>
        Account Country:{" "}
        <select
          type="select"
          placeholder="Country"
          name="country"
          ref={register({
            required: "Country Required",
          })}
        >
          {countrySelection}
        </select>
        <input type="submit" value="Setup Payments" />
      </form>

      {error && <>{error}</>}
    </>
  );
}
