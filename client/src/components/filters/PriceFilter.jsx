import "./PriceFilter.css";

const FIELDS = [
  { name: "minPrice", label: "Mínimo", placeholder: "$ 0" },
  { name: "maxPrice", label: "Máximo", placeholder: "Sin límite" },
];

const PriceFilter = ({ values, onChange }) => (
  <div>
    <div className="filter-title">Precio</div>
    {FIELDS.map(({ name, label, placeholder }) => (
      <label key={name} className="price-filter__field">
        {label}
        <input
          type="number"
          min="0"
          placeholder={placeholder}
          value={values[name]}
          onChange={(event) => onChange(name, event.target.value)}
        />
      </label>
    ))}
  </div>
);

export default PriceFilter;
