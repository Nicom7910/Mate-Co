import isBlank from "./isBlank.js";

export const MIN_PHONE_DIGITS = 8;

// Devuelve el mensaje de error del teléfono, o null si está bien.
const phoneError = (phone) => {
  if (isBlank(phone)) return "Ingresá tu teléfono.";
  if (phone.replace(/\D/g, "").length < MIN_PHONE_DIGITS)
    return `El teléfono debe tener al menos ${MIN_PHONE_DIGITS} números.`;
  return null;
};

export default phoneError;
