const toCategoryValues = (category) => ({
  name: category?.name ?? "",
  description: category?.description ?? "",
});

export default toCategoryValues;
