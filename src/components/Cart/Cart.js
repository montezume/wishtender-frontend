import React, { useEffect, useState, useContext } from "react";
import { fetchGet, fetchPostJson } from "../../scripts/fetchHelper";
import { displayConversion } from "../../scripts/helpers";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import ExchangeRateApiInterface from "../../scripts/ExchangeRatesApiInterface";
const ratesApi = new ExchangeRateApiInterface();

export default function Cart(props) {
  const [cart, setCart] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const clientCurrency = useContext(CurrencyContext);
  const localeContext = useContext(LocaleContext);
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
        //asyncronous?
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
            )}
            {JSON.stringify(items[i].qty)}
          </li>
        ));

        return (
          <>
            <h2>
              Gifts for {aliasCarts[a].alias.aliasName} @
              {aliasCarts[a].alias.handle}
            </h2>
            <div id={`message-for-${a}`}></div>
            <ul id={a}>
              {itemListItems}
              <button>remove dwy</button>
            </ul>
            <button onClick={() => checkoutCart(a)}>
              Check Out {aliasCarts[a].alias.aliasName}'s gifts
            </button>
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
