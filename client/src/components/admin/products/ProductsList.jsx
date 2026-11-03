import { useState } from "react";
import { useSelector } from "react-redux";
import useLoad from "../../../hooks/useLoad.js";
import {
  fetchCategories,
  selectCategories,
} from "../../../redux/categoriesSlice.js";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../../redux/productsSlice.js";
import isProductActive from "../../../utils/isProductActive.js";
import filterProducts from "../../../utils/filterProducts.js";
import FetchState from "../../common/FetchState.jsx";
import AdminProductFilters from "../../filters/AdminProductFilters.jsx";
import DeleteError from "../DeleteError.jsx";
import ProductsResults from "./ProductsResults.jsx";

const ProductsList = () => {
  useLoad(fetchProducts, true);
  useLoad(fetchCategories);
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const categories = useSelector(selectCategories);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    showDeleted: false,
  });
  const [page, setPage] = useState(1);
  const [deleteError, setDeleteError] = useState(null);

  const setFilter = (name, value) => {
    setFilters((previous) => ({ ...previous, [name]: value }));
    setPage(1);
  };

  const total = filters.showDeleted
    ? products.length
    : products.filter(isProductActive).length;

  return (
    <>
      <AdminProductFilters
        filters={filters}
        categories={categories}
        onChange={setFilter}
      />
      <DeleteError message={deleteError} onClose={() => setDeleteError(null)} />
      <FetchState
        loading={loading}
        error={error}
        loadingText="Cargando productos..."
      >
        <ProductsResults
          products={filterProducts(products, filters)}
          total={total}
          page={page}
          onPageChange={setPage}
          onDeleted={() => setDeleteError(null)}
          onDeleteError={setDeleteError}
        />
      </FetchState>
    </>
  );
};

export default ProductsList;
