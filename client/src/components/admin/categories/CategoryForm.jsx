import useForm from "../../../hooks/useForm.js";
import toCategoryValues from "../../../utils/toCategoryValues.js";
import AuthForm from "../../auth/AuthForm.jsx";
import FormError from "../../auth/FormError.jsx";
import FormField from "../../auth/FormField.jsx";
import SubmitButton from "../../auth/SubmitButton.jsx";
import { CATEGORY_FIELDS } from "./categoryFields.js";

const CategoryForm = ({ category, onSubmit, sending, error }) => {
  const { values, handleChange } = useForm(toCategoryValues(category));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      {CATEGORY_FIELDS.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={values[field.name]}
          onChange={handleChange}
        />
      ))}
      <FormError message={error} />
      <SubmitButton text="Guardar categoría" sending={sending} />
    </AuthForm>
  );
};

export default CategoryForm;
