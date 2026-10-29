import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useLoad from "../../hooks/useLoad.js";
import {
  fetchProduct,
  selectProduct,
  selectProductError,
  selectProductLoading,
} from "../../redux/productsSlice.js";
import getProductImages from "../../utils/getProductImages.js";
import FetchState from "../common/FetchState.jsx";
import RelatedProducts from "../products/RelatedProducts.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import ProductGallery from "./ProductGallery.jsx";
import ProductInfo from "./ProductInfo.jsx";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  useLoad(fetchProduct, id);
  const product = useSelector(selectProduct(id));
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando producto..."
    >
      {product && (
        <>
          <Breadcrumb category={product.category} name={product.name} />
          <div className="product-detail">
            <ProductGallery
              images={getProductImages(product)}
              name={product.name}
              discountPercentage={product.discountPercentage}
            />
            <ProductInfo product={product} />
          </div>
          <RelatedProducts product={product} />
        </>
      )}
    </FetchState>
  );
};

export default ProductDetail;
