import CategoryFilter from "./CategoryFilter.jsx";
import PriceFilter from "./PriceFilter.jsx";
import "./CatalogFilters.css";

const CatalogFilters = ({ categories, filters, onChange }) => (
  <aside className="catalog-filters">
    <CategoryFilter
      categories={categories}
      selected={filters.category}
      onChange={(value) => onChange("category", value)}
    />
    <PriceFilter values={filters} onChange={onChange} />
  </aside>
);

export default CatalogFilters;
