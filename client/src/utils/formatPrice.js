const formatPrice = (value) =>
  `$ ${Number(value).toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;

export default formatPrice;
