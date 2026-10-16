import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import getProductImages from "../../utils/getProductImages.js";
import FetchState from "../common/FetchState.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import ProductGallery from "./ProductGallery.jsx";
import ProductInfo from "./ProductInfo.jsx";
import "./ProductDetail.css";

const ProductDetail = ({ loggedIn, isAdmin, onAddToCart }) => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`/products/${id}`);

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
            <ProductInfo
              product={product}
              loggedIn={loggedIn}
              isAdmin={isAdmin}
              onAddToCart={onAddToCart}
            />
          </div>
        </>
      )}
    </FetchState>
  );
};

export default ProductDetail;
