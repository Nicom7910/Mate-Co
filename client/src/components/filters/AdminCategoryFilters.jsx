import AdminFilters from "./AdminFilters.jsx";
import SearchBar from "./SearchBar.jsx";

const AdminCategoryFilters = ({ search, onChange }) => (
  <AdminFilters>
    <SearchBar
      value={search}
      onChange={onChange}
      placeholder="Buscar categoría por nombre o descripción..."
      label="Buscar categoría"
    />
  </AdminFilters>
);

export default AdminCategoryFilters;
