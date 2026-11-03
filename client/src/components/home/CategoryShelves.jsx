import { useMemo } from "react";
import { useSelector } from "react-redux";
import useLoad from "../../hooks/useLoad.js";
import {
  fetchCategories,
  selectCategories,
} from "../../redux/categoriesSlice.js";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../redux/productsSlice.js";
import FetchState from "../common/FetchState.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import ProductGrid from "../products/ProductGrid.jsx";
import "./CategoryShelves.css";

const SHELF_SIZE = 4;

const CategoryShelves = () => {
  useLoad(fetchCategories);
  useLoad(fetchProducts);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const shelves = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          products: products
            .filter((product) => product.category?.id === category.id)
            .slice(0, SHELF_SIZE),
        }))
        .filter((shelf) => shelf.products.length > 0),
    [categories, products],
  );

  return (
    <div className="container shelves">
      <FetchState
        loading={loading}
        error={error}
        loadingText="Cargando productos..."
      >
        {shelves.map(({ category, products: items }) => (
          <section key={category.id} className="shelf">
            <SectionTitle
              title={category.name}
              linkTo={`/products?category=${category.id}`}
              linkText="Ver más"
            />
            <ProductGrid products={items} />
          </section>
        ))}
      </FetchState>
    </div>
  );
};

export default CategoryShelves;
