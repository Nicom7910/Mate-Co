import "./FormField.css";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  wide = false,
}) => (
  <div className={wide ? "form-field auth-form__full" : "form-field"}>
    <label htmlFor={name} className="form-field__label">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="form-field__input"
    >
      <option value="">{placeholder}</option>
      {options.map(({ value: optionValue, label: optionLabel }) => (
        <option key={optionValue} value={optionValue}>
          {optionLabel}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;
