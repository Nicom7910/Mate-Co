import isBlank from "./isBlank.js";
import isEmail from "./isEmail.js";
import phoneError from "./phoneError.js";

export const MIN_PASSWORD_LENGTH = 8;

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

  const phone = phoneError(values.phone);
  if (phone) errors.phone = phone;

  if (isBlank(values.address)) errors.address = "Ingresá tu dirección.";

  return errors;
};

export default validateRegister;
