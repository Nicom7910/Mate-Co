import useForm from "../../../hooks/useForm.js";
import useProductImages from "../../../hooks/useProductImages.js";
import useShownErrors from "../../../hooks/useShownErrors.js";
import getProductImages from "../../../utils/getProductImages.js";
import toProductValues from "../../../utils/toProductValues.js";
import validateProduct from "../../../utils/validateProduct.js";
import AuthForm from "../../auth/AuthForm.jsx";
import FormError from "../../auth/FormError.jsx";
import SubmitButton from "../../auth/SubmitButton.jsx";
import SubmitHint from "../../auth/SubmitHint.jsx";
import ImagePicker from "./ImagePicker.jsx";
import ProductFields from "./ProductFields.jsx";

const ProductForm = ({
  product,
  categories,
  onSubmit,
  sending,
  error,
  fieldErrors,
  onFieldChange,
}) => {
  const { values, handleChange } = useForm(
    toProductValues(product),
    onFieldChange,
  );
  const productImages = useProductImages(getProductImages(product));
  const errors = validateProduct(values, productImages.items.length);
  const { shown, handleBlur, touch } = useShownErrors(errors, fieldErrors);
  const images = {
    ...productImages,
    add: (files) => {
      productImages.add(files);
      onFieldChange?.("imageUrls");
    },
    remove: (key) => {
      productImages.remove(key);
      onFieldChange?.("imageUrls");
      touch("imageUrls");
    },
  };
  const invalid = Object.keys(errors).length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!invalid) onSubmit(values, images.items);
  };

  return (
    <AuthForm onSubmit={handleSubmit} noValidate>
      <ProductFields
        values={values}
        errors={shown}
        categories={categories}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ImagePicker images={images} error={shown.imageUrls} />
      <FormError message={error} />
      <SubmitHint show={invalid} />
      <SubmitButton
        text="Guardar producto"
        sending={sending}
        disabled={invalid}
      />
    </AuthForm>
  );
};

export default ProductForm;
