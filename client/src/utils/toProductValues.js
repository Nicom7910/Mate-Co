const toProductValues = (product) => ({
  name: product?.name ?? "",
  description: product?.description ?? "",
  price: product?.price ?? "",
  stock: product?.stock ?? "",
  imageUrl: product?.imageUrl ?? "",
  categoryId: product?.category ? String(product.category.id) : "",
  discountPercentage: product?.discountPercentage ?? "",
});

export default toProductValues;
