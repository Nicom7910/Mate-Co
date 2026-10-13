import "./FormField.css";

const FormField = ({
  label,
  name,
  value,
  onChange,
  wide = false,
  required = true,
  type = "text",
  error,
  ...inputProps
}) => (
  <div className={wide ? "form-field auth-form__full" : "form-field"}>
    <label htmlFor={name} className="form-field__label">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="form-field__input"
      aria-invalid={Boolean(error)}
      {...inputProps}
    />
    {error && (
      <p className="form-field__error" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default FormField;
