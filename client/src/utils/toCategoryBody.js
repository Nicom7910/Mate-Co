const toCategoryBody = (values) => ({
  name: values.name.trim(),
  description: values.description.trim() || null,
});

export default toCategoryBody;
