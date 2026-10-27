const balancedColumns = (count, maxColumns) => {
  if (count <= 0) return 1;
  const rows = Math.ceil(count / maxColumns);
  return Math.ceil(count / rows);
};

export default balancedColumns;
