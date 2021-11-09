import { createContext } from "react";

//not used any where yet

export const ExchangeRateContext = createContext({
  rates: undefined, // {all}
  setExchangeRates: () => {},
  getRates: async (base) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/exchange/all?base=${base}`
      );

      const rates = await response.json();
      return rates.rates;
    } catch (err) {
      return err;
    }
  },

  // getRate: async () => {
  //   fetch(
  //     `${process.env.REACT_APP_BASE_URL}/api/exchange?base=${alias.currency}&symbols=${clientCurrency}`
  //   )
  //     .then(async (response) => {
  //       let res = await response.json();
  //       setConvertRate(res.rate);
  //     })
  //     .catch((r) => {
  //       console.log(r);
  //     });
  // },
});
