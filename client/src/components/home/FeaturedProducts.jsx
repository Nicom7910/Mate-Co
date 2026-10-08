import useFetch from "../../hooks/useFetch.js";
import toList from "../../utils/toList.js";
import FetchState from "../common/FetchState.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import ProductGrid from "../products/ProductGrid.jsx";

const FEATURED_COUNT = 4;

const FeaturedProducts = () => {
  const { data, loading, error } = useFetch("/products");

  return (
    <section className="container section section--last">
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
        <ProductGrid products={toList(data).slice(0, FEATURED_COUNT)} />
      </FetchState>
    </section>
  );
};

export default FeaturedProducts;
