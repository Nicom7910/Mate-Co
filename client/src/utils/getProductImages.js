const getProductImages = (product) => {
  if (product?.imageUrls?.length) return product.imageUrls;
  return product?.imageUrl ? [product.imageUrl] : [];
};

export default getProductImages;
