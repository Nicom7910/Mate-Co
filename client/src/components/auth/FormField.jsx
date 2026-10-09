import "./FormField.css";

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  wide = false,
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
      placeholder={placeholder}
      autoComplete={autoComplete}
      required
      className="form-field__input"
    />
  </div>
);

export default FormField;
