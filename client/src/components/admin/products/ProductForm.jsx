import useForm from "../../../hooks/useForm.js";
import toProductValues from "../../../utils/toProductValues.js";
import AuthForm from "../../auth/AuthForm.jsx";
import FormError from "../../auth/FormError.jsx";
import FormField from "../../auth/FormField.jsx";
import FormSelect from "../../auth/FormSelect.jsx";
import SubmitButton from "../../auth/SubmitButton.jsx";
import { PRODUCT_FIELDS } from "./productFields.js";

const ProductForm = ({ product, categories, onSubmit, sending, error }) => {
  const { values, handleChange } = useForm(toProductValues(product));
  const categoryOptions = categories.map(({ id, name }) => ({
    value: String(id),
    label: name,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      {PRODUCT_FIELDS.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={values[field.name]}
          onChange={handleChange}
        />
      ))}
      <FormSelect
        label="Categoría"
        name="categoryId"
        value={values.categoryId}
        onChange={handleChange}
        options={categoryOptions}
        placeholder="Elegí una categoría"
        wide
      />
      <FormError message={error} />
      <SubmitButton text="Guardar producto" sending={sending} />
    </AuthForm>
  );
};

export default ProductForm;
