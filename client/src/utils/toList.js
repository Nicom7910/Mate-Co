const toList = (data) => {
  if (Array.isArray(data)) return data;
  return data?.content ?? [];
};

export default toList;
