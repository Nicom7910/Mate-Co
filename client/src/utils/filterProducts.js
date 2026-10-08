const filterProducts = (products, { category, search, minPrice, maxPrice }) =>
  products.filter((product) => {
    const price = product.finalPrice ?? product.price;
    const matchesCategory =
      !category || String(product.category?.id) === category;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesMin = minPrice === "" || price >= Number(minPrice);
    const matchesMax = maxPrice === "" || price <= Number(maxPrice);
    return matchesCategory && matchesSearch && matchesMin && matchesMax;
  });

export default filterProducts;
