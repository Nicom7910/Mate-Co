const validateExpiry = (expiry) => {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return "Ingresá el vencimiento con el formato MM/AA";

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return "El mes tiene que estar entre 01 y 12";

  const now = new Date();
  const expired =
    year < now.getFullYear() ||
    (year === now.getFullYear() && month < now.getMonth() + 1);
  return expired ? "La tarjeta está vencida" : null;
};

const validateCard = ({ holder, number, expiry, cvv }) => {
  const errors = {};

  if (holder.trim().length < 3)
    errors.holder = "Ingresá el nombre que figura en la tarjeta";
  if (number.replace(/\s/g, "").length !== 16)
    errors.number = "El número de la tarjeta tiene que tener 16 dígitos";
  const expiryError = validateExpiry(expiry);
  if (expiryError) errors.expiry = expiryError;
  if (cvv.length !== 3) errors.cvv = "El código de seguridad tiene 3 dígitos";

  return errors;
};

export default validateCard;
