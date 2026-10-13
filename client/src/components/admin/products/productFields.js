export const PRODUCT_FIELDS = [
  { name: "name", label: "Nombre", wide: true },
  { name: "description", label: "Descripción", wide: true, required: false },
  { name: "price", label: "Precio", type: "number", min: "0.01", step: "0.01" },
  { name: "stock", label: "Stock", type: "number", min: "0", step: "1" },
  {
    name: "discountPercentage",
    label: "Descuento (%) opcional",
    type: "number",
    min: "0",
    max: "100",
    step: "1",
    required: false,
  },
];
