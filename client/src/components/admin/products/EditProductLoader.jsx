import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch.js";
import FetchState from "../../common/FetchState.jsx";
import ProductEditor from "./ProductEditor.jsx";

const EditProductLoader = ({ token }) => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`/products/${id}`);

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando producto..."
    >
      {product && <ProductEditor token={token} product={product} />}
    </FetchState>
  );
};

export default EditProductLoader;
