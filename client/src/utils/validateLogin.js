import isBlank from "./isBlank.js";
import isEmail from "./isEmail.js";

const validateLogin = ({ email, password }) => {
  const errors = {};

  if (isBlank(email)) errors.email = "Ingresá tu email.";
  else if (!isEmail(email))
    errors.email = "Ingresá un email válido, por ejemplo nombre@mail.com.";
  if (isBlank(password)) errors.password = "Ingresá tu contraseña.";

  return errors;
};

export default validateLogin;
