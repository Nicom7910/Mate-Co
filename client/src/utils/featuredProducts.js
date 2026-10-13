const featuredProducts = (products, count) =>
  [...products]
    .sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0))
    .slice(0, count);

export default featuredProducts;
