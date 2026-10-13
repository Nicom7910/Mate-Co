import useFetch from "../../hooks/useFetch.js";
import featuredProducts from "../../utils/featuredProducts.js";
import toList from "../../utils/toList.js";
import FetchState from "../common/FetchState.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import FeaturedCarousel from "./FeaturedCarousel.jsx";

const FEATURED_COUNT = 12;

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
        <FeaturedCarousel
          products={featuredProducts(toList(data), FEATURED_COUNT)}
        />
      </FetchState>
    </section>
  );
};

export default FeaturedProducts;
