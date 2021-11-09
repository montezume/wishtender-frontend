import React, { useEffect, useContext, useState } from "react";
import AliasCart from "./AliasCart";
import { CartContext } from "../../contexts/CartContext";
import { LocaleContext } from "../../contexts/LocaleContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import EmptyCart from "./EmptyCart";
import { Box, Typography } from "@material-ui/core";
export default function AllCarts() {
  const [useRates, setUseRates] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const {
    getCart,
    cart,
    setCart,
    setCartNotifications,
    cartNotificationsFromCart,
  } = useContext(CartContext);
  const { currency: clientCurrency } = useContext(CurrencyContext);
  const localeContext = useContext(LocaleContext);

  useEffect(() => {
    //set useRates

    if (clientCurrency === null) return undefined;
    if (!cart || !Object.values(cart).length) return undefined;
    // need rates for messages
    const anyAliasCartIsNotInUSD = !!Object.values(cart.aliasCarts).filter(
      (aliasCart) => aliasCart.alias.currency !== "USD"
    ).length;

    // need rates for cart--- should it also be if the alias currency is different than the client?
    const convertCart = clientCurrency !== "noConversion";

    //could also add don't convert if allaliascarts are the same as the client

    setUseRates(convertCart || anyAliasCartIsNotInUSD);
  }, [clientCurrency, cart, useRates]);

  useEffect(() => {
    if (!useRates) return;

    if (!exchangeRates) {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/exchange/all?base=${clientCurrency}`
        );

        const rates = await response.json();
        setExchangeRates(rates.rates);
      };

      fetchData();
    }
  }, [clientCurrency, exchangeRates, useRates]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/exchange/all?base=${
          clientCurrency === "noConversion" ? "USD" : clientCurrency
        }`
      );

      const rates = await response.json();
      setExchangeRates(rates.rates);
    };

    fetchData();
  }, [clientCurrency]);

  useEffect(() => {
    // get and convert cart
    (async () => {
      const newCart = await getCart(
        clientCurrency,
        localeContext,
        exchangeRates
      );

      setCart(newCart);
      setCartNotifications(cartNotificationsFromCart(newCart));
    })();
  }, [
    cartNotificationsFromCart,
    clientCurrency,
    exchangeRates,
    getCart,
    localeContext,
    setCart,
    setCartNotifications,
  ]);

  return (
    <>
      {cart !== undefined &&
        (cart &&
        useRates !== null &&
        ((useRates && exchangeRates) || !useRates) &&
        cart.aliasCarts &&
        Object.values(cart.aliasCarts).length ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" style={{ margin: "0 8px" }}>
                Cart
              </Typography>
            </Box>
            {Object.values(cart.aliasCarts).map((cart) => (
              <AliasCart
                exchangeRates={exchangeRates}
                // rateBase={rateBase}
                cart={cart}
              />
            ))}
          </>
        ) : (
          <EmptyCart></EmptyCart>
        ))}
    </>
  );
}
