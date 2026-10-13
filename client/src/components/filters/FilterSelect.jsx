import "./FilterSelect.css";

const FilterSelect = ({ label, value, onChange, options, allLabel }) => (
  <select
    className="filter-select"
    aria-label={label}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  >
    <option value="">{allLabel}</option>
    {options.map(({ value: optionValue, label: optionLabel }) => (
      <option key={optionValue} value={optionValue}>
        {optionLabel}
      </option>
    ))}
  </select>
);

export default FilterSelect;
