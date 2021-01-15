import React, { useEffect, useState, useContext } from "react";
import { fetchGet, fetchPostJson } from "../../scripts/fetchHelper";
import { displayConversion } from "../../scripts/helpers";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import ExchangeRateApiInterface from "../../scripts/ExchangeRatesApiInterface";
import { useForm } from "react-hook-form";

const ratesApi = new ExchangeRateApiInterface();

export default function Cart(props) {
  const [cart, setCart] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const clientCurrency = useContext(CurrencyContext);
  const localeContext = useContext(LocaleContext);

  const { register, handleSubmit, errors } = useForm();

  // const [checkoutSessionId, setCheckoutSessionId] = useState("");
  useEffect(() => {
    if (!props.cart && !cart) {
      fetchGet("/cart", setCart);
    }
  }, [cart, props.cart]);

  useEffect(() => {
    if (clientCurrency) {
      ratesApi.getAllExchangeRates(clientCurrency).then(setExchangeRates);
    }
  }, [clientCurrency]);

  const checkoutCart = (aliasId) => {
    // create stripe session and get session id
    // redirect to session in the callback
    fetchPostJson(
      {
        alias: aliasId,
        order: {
          buyerInfo: {
            email: "g@props.com",
            fromLine: "zoobie122 on chaterbate",
          },
          alias: aliasId,
          noteToWisher: "You are so hot",
          processedBy: "Stripe",
          processed: false,
        },
      },
      "/checkout",
      (data) => {
        goToCheckout(data.checkoutSessionId);
      }
    );
  };
  const goToCheckout = (sessionId) => {
    /* Handle any errors returns from Checkout  */
    var handleResult = function (result) {
      if (result.error) {
        alert(result.error.message);
      }
    };

    var stripe = window.Stripe(
      "pk_test_51HAi5vLLBOhef2QNgeOEgpmhxfegnaTxArp0ri2QR4e7c4HxayuuHv8jWN9AzTuLKKEIztnhXgvss5P70Gs4A7kI00052oBzNQ"
    );

    stripe
      .redirectToCheckout({
        sessionId: sessionId,
      })
      .then(handleResult);
  };

  const cartToHTML = (() => {
    if (cart || props.cart) {
      const cartInfo = cart || props.cart;
      const aliasCarts = cartInfo.aliasCarts;
      const aliases = Object.keys(aliasCarts);
      const aliasULs = aliases.map((a) => {
        const items = aliasCarts[a].items;
        const itemKeys = Object.keys(items);
        // console.log(item[itemKeys].price);
        const itemListItems = itemKeys.map((i) => (
          <li key={i}>
            {items[i].item.itemName}{" "}
            {displayConversion(
              items[i].price,
              items[i].price *
                (1 / (exchangeRates && exchangeRates[items[i].item.currency]) ||
                  1),
              items[i].item.currency,
              clientCurrency,
              "en-US",
              localeContext
            )}{" "}
            QTY:
            {JSON.stringify(items[i].qty)} <button>-</button>
            <button>+</button>
            <button>remove dwy</button>
          </li>
        ));
        let messageLength;
        if (exchangeRates) {
          const totalPriceUSD =
            (aliasCarts[a].totalPrice * 1) /
            (exchangeRates && exchangeRates["USD"]);
          messageLength = Math.round(100 + totalPriceUSD);
        }
        return (
          <>
            {exchangeRates && (
              <>
                <h2>
                  Gifts for {aliasCarts[a].alias.aliasName} @
                  {aliasCarts[a].alias.handle}
                </h2>
                <ul id={a}>
                  {itemListItems} Total:{" "}
                  {displayConversion(
                    aliasCarts[a].totalPrice,
                    aliasCarts[a].totalPrice *
                      (1 /
                        (exchangeRates &&
                          exchangeRates[aliasCarts[a].alias.currency]) || 1),
                    aliasCarts[a].alias.currency,
                    clientCurrency,
                    "en-US",
                    localeContext
                  )}{" "}
                  + Fees
                  <form
                    onSubmit={handleSubmit((data) => {
                      data.aliasId = a;
                      checkoutCart(data);
                    })}
                  >
                    <label for="note">Note To Wisher {messageLength}: </label>
                    <div>
                      <textarea
                        ref={register({
                          maxLength: {
                            value: messageLength,
                            message: `message must be less than ${
                              messageLength + 1
                            }characters`,
                          },
                        })}
                        id={`note-for-${a}`}
                        name="note"
                        rows="4"
                        cols="50"
                      ></textarea>
                    </div>
                    Email:
                    <input id="email" name="email"></input> ** Your email is
                    private. WishTender will use your email to relay you any
                    thank you notes from the wisher, but the wisher will not see
                    your email.
                    <br></br> From: <input id="from" name="fromLine"></input> **
                    This is what the wisher will see.
                  </form>
                </ul>
                <button type="submit">
                  Check Out {aliasCarts[a].alias.aliasName}'s gifts
                </button>
              </>
            )}
          </>
        );
      });
      return aliasULs;
    } else {
      return "Your cart is empty";
    }
  })();
  return <div>{cartToHTML}</div>;
}
