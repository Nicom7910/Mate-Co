import isBlank from "./isBlank.js";

const validateCategory = ({ name }, hasImage) => {
  const errors = {};

  if (isBlank(name)) errors.name = "Ingresá el nombre de la categoría.";
  if (!hasImage) errors.imageUrl = "Subí una foto de la categoría.";

  return errors;
};

export default validateCategory;
