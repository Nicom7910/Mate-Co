import isBlank from "./isBlank.js";
import isEmail from "./isEmail.js";

export const MIN_PASSWORD_LENGTH = 8;
const MIN_PHONE_DIGITS = 8;

const validateRegister = (values) => {
  const errors = {};

  if (isBlank(values.name)) errors.name = "Ingresá tu nombre.";
  if (isBlank(values.lastName)) errors.lastName = "Ingresá tu apellido.";
  if (isBlank(values.username))
    errors.username = "Ingresá un nombre de usuario.";

  if (isBlank(values.email)) errors.email = "Ingresá tu email.";
  else if (!isEmail(values.email))
    errors.email = "Ingresá un email válido, por ejemplo nombre@mail.com.";

  if (values.password.length < MIN_PASSWORD_LENGTH)
    errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;

  if (isBlank(values.phone)) errors.phone = "Ingresá tu teléfono.";
  else if (values.phone.replace(/\D/g, "").length < MIN_PHONE_DIGITS)
    errors.phone = `El teléfono debe tener al menos ${MIN_PHONE_DIGITS} números.`;

  if (isBlank(values.address)) errors.address = "Ingresá tu dirección.";

  return errors;
};

export default validateRegister;
