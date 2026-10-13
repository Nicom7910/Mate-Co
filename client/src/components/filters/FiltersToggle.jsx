import "./FiltersToggle.css";

const FiltersToggle = ({ open, activeCount, onClick }) => (
  <button
    type="button"
    className="filters-toggle"
    onClick={onClick}
    aria-expanded={open}
    aria-controls="catalog-filters"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 5h18l-7 8v6l-4-2v-4z" />
    </svg>
    {open ? "Ocultar filtros" : "Filtros"}
    {activeCount > 0 && (
      <span className="filters-toggle__count">{activeCount}</span>
    )}
  </button>
);

export default FiltersToggle;
