import { useSelector } from "react-redux";
import useLoad from "../../hooks/useLoad.js";
import {
  fetchProductsByCategory,
  selectProductsByCategory,
} from "../../redux/productsSlice.js";
import ProductSuggestions from "./ProductSuggestions.jsx";

const RELATED_COUNT = 4;

const RelatedProducts = ({ product }) => {
  const categoryId = product.category.id;
  useLoad(fetchProductsByCategory, categoryId);
  const sameCategory = useSelector(selectProductsByCategory(categoryId));
  const related = sameCategory
    .filter(({ id }) => id !== product.id)
    .slice(0, RELATED_COUNT);

  return (
    <ProductSuggestions
      title="Productos relacionados"
      products={related}
      linkTo={`/products?category=${categoryId}`}
      linkText="Ver la categoría"
    />
  );
};

export default RelatedProducts;
