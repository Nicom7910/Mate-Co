const toProductBody = (values) => ({
  name: values.name.trim(),
  description: values.description.trim() || null,
  price: Number(values.price),
  stock: Number(values.stock),
  imageUrl: values.imageUrl.trim() || null,
  categoryId: Number(values.categoryId),
  discountPercentage:
    values.discountPercentage === "" ? null : Number(values.discountPercentage),
});

export default toProductBody;
