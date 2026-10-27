import useFetch from "../../hooks/useFetch.js";
import featuredProducts from "../../utils/featuredProducts.js";
import toList from "../../utils/toList.js";
import ProductSuggestions from "./ProductSuggestions.jsx";

const SUGGESTED_COUNT = 4;

const SuggestedProducts = ({ excludeIds = [] }) => {
  const { data } = useFetch("/products");
  const available = toList(data).filter(({ id }) => !excludeIds.includes(id));

  return (
    <ProductSuggestions
      title="Quizás te interese"
      products={featuredProducts(available, SUGGESTED_COUNT)}
      linkTo="/products"
      linkText="Ver todos"
    />
  );
};

export default SuggestedProducts;
