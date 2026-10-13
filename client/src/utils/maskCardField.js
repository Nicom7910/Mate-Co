const onlyDigits = (value, max) => value.replace(/\D/g, "").slice(0, max);

const MASKS = {
  number: (value) => onlyDigits(value, 16).replace(/(\d{4})(?=\d)/g, "$1 "),
  expiry: (value) => {
    const digits = onlyDigits(value, 4);
    return digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  },
  cvv: (value) => onlyDigits(value, 3),
};

const maskCardField = (name, value) =>
  MASKS[name] ? MASKS[name](value) : value;

export default maskCardField;
