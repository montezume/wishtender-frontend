import getCurrencies from "./getCurrencies";

const fetchUser = (callback) => {
  return fetch("/users/current")
    .then((res) => {
      if (res.status === 204) return null;
      return res.json();
    })
    .then((user) => {
      callback(user);
      return user;
    });
};

const parsedCookies = () => {
  const str = decodeURIComponent(document.cookie).split("; ");
  const result = {};
  for (let i = 0; i < str.length; i++) {
    const cur = str[i].split("=");
    result[cur[0]] = cur[1];
  }
  return result;
};

const displayCurrency = (price, currency, locale) => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    price
  );
};

const displayConversion = (
  price,
  convertedPrice,
  fromCurrency,
  toCurrency,
  fromLocale,
  toLocale
) => {
  return `${displayCurrency(
    convertedPrice,
    toCurrency,
    toLocale
  )} estimated from ${displayCurrency(price, fromCurrency, fromLocale)}`;
};
const chooseCurrency = (locale) => {
  if (locale.countryCode) {
    const currencies = getCurrencies(locale.countryCode);
    //replace with form to select currency and set document.cookie
    if (currencies.length > 1)
      return alert(
        "Here we would ask the user to pick currency: " + currencies.join(", ")
      );

    document.cookie = `currency= ${currencies[0]}`; // we need to give the user a way to change the currency later
  } else {
    //replace with form to select currency based on language and set document.cookie
    alert(
      `Here the user would pick currency from list of currencies. Currencies used in countries where people speak languageCode: "${locale.languageCode}" could be at top of list`
    );
  }
};

const clientLocale = (user) => {
  const cookies = parsedCookies();
  return user ? user?.locale : cookies.locale.locale;
};

const clientCurrency = (user) => {
  const cookies = parsedCookies();
  return user ? user?.currency : cookies.currency;
};

const toDotDecimal = (price) => {
  return parseFloat(
    price.replace(/(,|\.)([0-9]{3})/g, "$2").replace(/(,|\.)/, ".")
  );
};

const toCurrencyDecimals = (val, currency) => {
  const decimalPlaces = Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .formatToParts("1")
    .find((part) => part.type === "fraction").value.length;

  return val.toFixed(decimalPlaces);
};

const toSmallestUnit = (price, currency) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  })
    .formatToParts(price)
    .reduce((a, c) => {
      if (c.type === "integer" || c.type === "fraction") return a + c.value;
      return a;
    }, "");
};

const getSymbol = (currency) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .formatToParts("1")
    .find((part) => (part.type = "currency")).value;
};
const isValidPrice = (value) => {
  return (
    /^(0|[1-9][0-9]{0,2}(?:(.[0-9]{3})*|[0-9]*))(\,[0-9]+){0,1}$/.test(value) ||
    /^(0|[1-9][0-9]{0,2}(?:(,[0-9]{3})*|[0-9]*))(\.[0-9]+){0,1}$/.test(value)
  );
};

export {
  isValidPrice,
  getSymbol,
  toSmallestUnit,
  toCurrencyDecimals,
  toDotDecimal,
  clientCurrency,
  clientLocale,
  displayCurrency,
  parsedCookies,
  fetchUser,
  chooseCurrency,
  displayConversion,
};
