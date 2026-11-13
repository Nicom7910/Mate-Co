import isBlank from "./isBlank.js";
import lengthError from "./lengthError.js";
import { MAX_CATEGORY_DESCRIPTION_LENGTH, MAX_NAME_LENGTH } from "./limits.js";

const validateCategory = ({ name, description }, hasImage) => {
  const errors = {};

  if (isBlank(name)) errors.name = "Ingresá el nombre de la categoría.";
  else {
    const nameError = lengthError("El nombre", name.trim(), MAX_NAME_LENGTH);
    if (nameError) errors.name = nameError;
  }
  const descriptionError = lengthError(
    "La descripción",
    (description ?? "").trim(),
    MAX_CATEGORY_DESCRIPTION_LENGTH,
  );
  if (descriptionError) errors.description = descriptionError;
  if (!hasImage) errors.imageUrl = "Subí una foto de la categoría.";

  return errors;
};

export default validateCategory;
