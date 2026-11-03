import { useMemo } from "react";
import { useSelector } from "react-redux";
import useLoad from "../../hooks/useLoad.js";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../redux/productsSlice.js";
import featuredProducts from "../../utils/featuredProducts.js";
import FetchState from "../common/FetchState.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import FeaturedCarousel from "./FeaturedCarousel.jsx";

const FEATURED_COUNT = 12;

const FeaturedProducts = () => {
  useLoad(fetchProducts);
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const featured = useMemo(
    () => featuredProducts(products, FEATURED_COUNT),
    [products],
  );

  return (
    <section className="container section">
      <SectionTitle
        title="Productos destacados"
        linkTo="/products"
        linkText="Ver todos"
      />
      <FetchState
        loading={loading}
        error={error}
        loadingText="Cargando productos..."
      >
        <FeaturedCarousel products={featured} />
      </FetchState>
    </section>
  );
};

export default FeaturedProducts;
