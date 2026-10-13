const countActiveFilters = ({ category, minPrice, maxPrice }) =>
  [category, minPrice, maxPrice].filter(Boolean).length;

export default countActiveFilters;
