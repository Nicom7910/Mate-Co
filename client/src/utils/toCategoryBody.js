const toCategoryBody = (values) => ({
  name: values.name.trim(),
  description: values.description.trim() || null,
  imageUrl: values.imageUrl,
});

export default toCategoryBody;
