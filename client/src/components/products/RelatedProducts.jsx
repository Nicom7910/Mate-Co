import useFetch from "../../hooks/useFetch.js";
import toList from "../../utils/toList.js";
import ProductSuggestions from "./ProductSuggestions.jsx";

const RELATED_COUNT = 4;

const RelatedProducts = ({ product }) => {
  const { data } = useFetch(`/products/category/${product.category.id}`);
  const related = toList(data)
    .filter(({ id }) => id !== product.id)
    .slice(0, RELATED_COUNT);

  return (
    <ProductSuggestions
      title="Productos relacionados"
      products={related}
      linkTo={`/products?category=${product.category.id}`}
      linkText="Ver la categoría"
    />
  );
};

export default RelatedProducts;
