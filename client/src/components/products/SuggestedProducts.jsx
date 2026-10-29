import { useSelector } from "react-redux";
import useLoad from "../../hooks/useLoad.js";
import { fetchProducts, selectProducts } from "../../redux/productsSlice.js";
import featuredProducts from "../../utils/featuredProducts.js";
import ProductSuggestions from "./ProductSuggestions.jsx";

const SUGGESTED_COUNT = 4;

const SuggestedProducts = ({ excludeIds = [] }) => {
  useLoad(fetchProducts);
  const products = useSelector(selectProducts);
  const available = products.filter(({ id }) => !excludeIds.includes(id));

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
