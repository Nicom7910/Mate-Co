import FormField from "../../auth/FormField.jsx";
import FormSelect from "../../auth/FormSelect.jsx";
import { PRODUCT_FIELDS } from "./productFields.js";

const ProductFields = ({ values, errors, categories, onChange, onBlur }) => {
  const categoryOptions = categories.map(({ id, name }) => ({
    value: String(id),
    label: name,
  }));

  return (
    <>
      {PRODUCT_FIELDS.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={values[field.name]}
          onChange={onChange}
          onBlur={onBlur}
          error={errors[field.name]}
        />
      ))}
      <FormSelect
        label="Categoría"
        name="categoryId"
        value={values.categoryId}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.categoryId}
        options={categoryOptions}
        placeholder="Elegí una categoría"
        wide
      />
    </>
  );
};

export default ProductFields;
