const rowColumns = (count, maxColumns) => {
  if (count <= 0) return [];
  const rows = Math.ceil(count / maxColumns);
  const base = Math.floor(count / rows);
  const extra = count % rows;
  const columns = [];
  for (let row = 0; row < rows; row++) {
    const size = row < extra ? base + 1 : base;
    for (let i = 0; i < size; i++) columns.push(size);
  }
  return columns;
};

export default rowColumns;
