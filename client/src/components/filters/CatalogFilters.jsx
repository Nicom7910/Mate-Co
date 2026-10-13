import { useState } from "react";
import countActiveFilters from "../../utils/countActiveFilters.js";
import CategoryFilter from "./CategoryFilter.jsx";
import FiltersToggle from "./FiltersToggle.jsx";
import PriceFilter from "./PriceFilter.jsx";
import "./CatalogFilters.css";

const CatalogFilters = ({ categories, filters, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FiltersToggle
        open={open}
        activeCount={countActiveFilters(filters)}
        onClick={() => setOpen(!open)}
      />
      <aside
        id="catalog-filters"
        className={`catalog-filters ${open ? "catalog-filters--open" : ""}`}
      >
        <CategoryFilter
          categories={categories}
          selected={filters.category}
          onChange={(value) => onChange("category", value)}
        />
        <PriceFilter values={filters} onChange={onChange} />
      </aside>
    </>
  );
};

export default CatalogFilters;
