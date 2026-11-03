import { useMemo } from "react";
import { useSelector } from "react-redux";
import useLoad from "../../hooks/useLoad.js";
import { fetchProducts, selectProducts } from "../../redux/productsSlice.js";
import ProductSuggestions from "./ProductSuggestions.jsx";

const RELATED_COUNT = 4;

const RelatedProducts = ({ product }) => {
  const categoryId = product.category.id;
  useLoad(fetchProducts);
  const products = useSelector(selectProducts);
  const related = useMemo(
    () =>
      products
        .filter(
          ({ id, category }) => id !== product.id && category?.id === categoryId,
        )
        .slice(0, RELATED_COUNT),
    [products, product.id, categoryId],
  );

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
