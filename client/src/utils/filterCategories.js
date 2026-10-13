const filterCategories = (categories, search) => {
  const text = search.trim().toLowerCase();

  return categories.filter(
    ({ name, description }) =>
      name.toLowerCase().includes(text) ||
      (description ?? "").toLowerCase().includes(text),
  );
};

export default filterCategories;
