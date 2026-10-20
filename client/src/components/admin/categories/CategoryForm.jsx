import useForm from "../../../hooks/useForm.js";
import useShownErrors from "../../../hooks/useShownErrors.js";
import toCategoryValues from "../../../utils/toCategoryValues.js";
import validateCategory from "../../../utils/validateCategory.js";
import AuthForm from "../../auth/AuthForm.jsx";
import FormError from "../../auth/FormError.jsx";
import FormField from "../../auth/FormField.jsx";
import SubmitButton from "../../auth/SubmitButton.jsx";
import SubmitHint from "../../auth/SubmitHint.jsx";
import { CATEGORY_FIELDS } from "./categoryFields.js";

const CategoryForm = ({ category, onSubmit, sending, error }) => {
  const { values, handleChange } = useForm(toCategoryValues(category));
  const errors = validateCategory(values);
  const { shown, handleBlur } = useShownErrors(errors);
  const invalid = Object.keys(errors).length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!invalid) onSubmit(values);
  };

  return (
    <AuthForm onSubmit={handleSubmit} noValidate>
      {CATEGORY_FIELDS.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={values[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={shown[field.name]}
        />
      ))}
      <FormError message={error} />
      <SubmitHint show={invalid} />
      <SubmitButton
        text="Guardar categoría"
        sending={sending}
        disabled={invalid}
      />
    </AuthForm>
  );
};

export default CategoryForm;
