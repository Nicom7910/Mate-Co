import isBlank from "./isBlank.js";

const validateProduct = (
  { name, price, stock, categoryId, discountPercentage },
  imageCount,
) => {
  const errors = {};

  if (isBlank(name)) errors.name = "Ingresá el nombre del producto.";
  if (isBlank(price) || Number(price) <= 0)
    errors.price = "Ingresá un precio mayor a 0.";
  if (isBlank(stock) || Number(stock) < 0 || !Number.isInteger(Number(stock)))
    errors.stock = "Ingresá el stock: un número entero de 0 en adelante.";
  if (isBlank(categoryId)) errors.categoryId = "Elegí una categoría.";

  if (imageCount === 0)
    errors.imageUrls = "Subí al menos una foto del producto.";

  const discount = Number(discountPercentage);
  if (
    !isBlank(discountPercentage) &&
    (!Number.isInteger(discount) || discount < 0 || discount > 100)
  )
    errors.discountPercentage =
      "El descuento tiene que ser un número entero entre 0 y 100.";

  return errors;
};

export default validateProduct;
