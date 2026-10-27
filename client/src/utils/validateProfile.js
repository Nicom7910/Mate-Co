import isBlank from "./isBlank.js";
import phoneError from "./phoneError.js";

const validateProfile = (values) => {
  const errors = {};

  if (isBlank(values.name)) errors.name = "Ingresá tu nombre.";
  if (isBlank(values.lastName)) errors.lastName = "Ingresá tu apellido.";

  const phone = phoneError(values.phone);
  if (phone) errors.phone = phone;

  if (isBlank(values.address)) errors.address = "Ingresá tu dirección.";

  return errors;
};

export default validateProfile;
