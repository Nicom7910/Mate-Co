import useFetch from "../../../hooks/useFetch.js";
import useProductSave from "../../../hooks/useProductSave.js";
import toList from "../../../utils/toList.js";
import FetchState from "../../common/FetchState.jsx";
import ProductForm from "./ProductForm.jsx";
import "./ProductEditor.css";

const ProductEditor = ({ token, product }) => {
  const { data, loading, error } = useFetch("/categories");
  const { run, sending, error: saveError } = useProductSave(token, product?.id);
  const categories = toList(data);

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
          />
        )}
      </FetchState>
    </div>
  );
};

export default ProductEditor;
