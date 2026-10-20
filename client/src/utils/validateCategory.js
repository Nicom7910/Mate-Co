import isBlank from "./isBlank.js";

const validateCategory = ({ name }) =>
  isBlank(name) ? { name: "Ingresá el nombre de la categoría." } : {};

export default validateCategory;
