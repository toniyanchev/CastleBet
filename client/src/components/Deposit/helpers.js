export const convertAmountToCC = (amount, currency) => {
  switch (currency) {
    case "USD":
      return amount * 100;
    case "GBP":
      return amount * 139;
    case "EUR":
      return amount * 119;
  }
};

export const convertCCToAmount = (amount, currency) => {
  switch (currency) {
    case "USD":
      return amount / 100;
    case "GBP":
      return amount / 139;
    case "EUR":
      return amount / 119;
  }
};
