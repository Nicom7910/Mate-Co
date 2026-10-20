import "./FormField.css";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
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
      onBlur={onBlur}
      required
      className="form-field__input"
      aria-invalid={Boolean(error)}
    >
      <option value="">{placeholder}</option>
      {options.map(({ value: optionValue, label: optionLabel }) => (
        <option key={optionValue} value={optionValue}>
          {optionLabel}
        </option>
      ))}
    </select>
    {error && (
      <p className="form-field__error" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default FormSelect;
