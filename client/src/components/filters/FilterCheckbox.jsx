import "./FilterCheckbox.css";

const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="filter-checkbox">
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
    {label}
  </label>
);

export default FilterCheckbox;
