import isProductActive from "./isProductActive.js";

const filterProducts = (
  products,
  {
    category = "",
    search = "",
    minPrice = "",
    maxPrice = "",
    showDeleted = false,
  },
) =>
  products.filter((product) => {
    const price = product.finalPrice ?? product.price;
    const matchesCategory =
      !category || String(product.category?.id) === category;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesMin = minPrice === "" || price >= Number(minPrice);
    const matchesMax = maxPrice === "" || price <= Number(maxPrice);

    const matchesActive = showDeleted || isProductActive(product);

    return matchesActive && matchesCategory && matchesSearch && matchesMin && matchesMax;
  });

export default filterProducts;
