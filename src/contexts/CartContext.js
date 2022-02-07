import { createContext } from "react";
import { parseCartPrices } from "../scripts/helpers";
const cartNotificationsFromCart = (cart) => {
  let numInCart;
  if (!Object.keys(cart).length || !Object.keys(cart.aliasCarts).length) {
    return (numInCart = 0);
  } else {
    numInCart = Object.values(cart.aliasCarts).reduce(
      (a, acart) => acart.totalQty + a,
      0
    );
  }

  return numInCart;
};
export const CartContext = createContext({
  cart: null,
  setCart: () => {},

  getCart: async (clientCurrency, localeContext, exchangeRates) => {
    let cart;
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/cart`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 500) {
          const message = await res.text();
          alert(message);
        } else {
          cart = await res.json();
          if (!Object.keys(cart).length || !Object.keys(cart.aliasCarts).length)
            return;
          parseCartPrices(cart, clientCurrency, localeContext, exchangeRates);
          console.log(cart);
        }
      })
      .catch((err) => {
        console.log(cart ? "couldn't parse cart" : "couldn't get cart");
      });

    return cart || null;
  },
  cartNotifications: null,
  setCartNotifications: null,
  cartNotificationsFromCart,
  getCartNotifications: async () => {
    let numInCart;
    let cart;
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/cart`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 500) {
          const message = await res.text();
          alert(message);
        } else {
          cart = await res.json();
          numInCart = cartNotificationsFromCart(cart);
        }
      })

      .catch((err) => {
        console.log(cart ? "error getting cart" : "couldn't get cart", err);
      });

    return numInCart || null;
  },
});
