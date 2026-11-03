import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useLoad from "../../../hooks/useLoad.js";
import {
  fetchProduct,
  selectProduct,
  selectProductError,
  selectProductLoading,
} from "../../../redux/productsSlice.js";
import FetchState from "../../common/FetchState.jsx";
import ProductEditor from "./ProductEditor.jsx";

const EditProductLoader = () => {
  const { id } = useParams();
  useLoad(fetchProduct, id);
  const product = useSelector(selectProduct(id));
  const loading = useSelector(selectProductLoading(id));
  const error = useSelector(selectProductError(id));

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando producto..."
    >
      {product && <ProductEditor product={product} />}
    </FetchState>
  );
};

export default EditProductLoader;
