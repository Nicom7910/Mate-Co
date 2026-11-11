import { useSelector } from "react-redux";
import useProductSave from "../../../hooks/useProductSave.js";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
} from "../../../redux/categoriesSlice.js";
import FetchState from "../../common/FetchState.jsx";
import ProductForm from "./ProductForm.jsx";
import "./ProductEditor.css";

const ProductEditor = ({ product }) => {
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const {
    run,
    sending,
    error: saveError,
    fieldErrors,
    clearFieldError,
  } = useProductSave(product?.id);

  return (
    <div className="product-editor">
      <FetchState
        loading={loading}
        error={error}
        loadingText="Cargando categorías..."
      >
        {categories.length === 0 ? (
          <p className="message">
            Todavía no hay categorías. Creá una desde la pestaña Categorías.
          </p>
        ) : (
          <ProductForm
            product={product}
            categories={categories}
            onSubmit={run}
            sending={sending}
            error={saveError}
            fieldErrors={fieldErrors}
            onFieldChange={clearFieldError}
          />
        )}
      </FetchState>
    </div>
  );
};

export default ProductEditor;
