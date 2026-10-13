import AdminFilters from "./AdminFilters.jsx";
import FilterSelect from "./FilterSelect.jsx";
import SearchBar from "./SearchBar.jsx";

const AdminProductFilters = ({ filters, categories, onChange }) => {
  const categoryOptions = categories.map(({ id, name }) => ({
    value: String(id),
    label: name,
  }));

  return (
    <AdminFilters>
      <SearchBar
        value={filters.search}
        onChange={(value) => onChange("search", value)}
        placeholder="Buscar producto por nombre..."
        label="Buscar producto"
      />
      <FilterSelect
        label="Filtrar por categoría"
        value={filters.category}
        onChange={(value) => onChange("category", value)}
        options={categoryOptions}
        allLabel="Todas las categorías"
      />
    </AdminFilters>
  );
};

export default AdminProductFilters;
