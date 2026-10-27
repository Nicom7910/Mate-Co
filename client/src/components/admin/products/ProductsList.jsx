import { useState } from "react";
import request from "../../../api/request.js";
import useFetch from "../../../hooks/useFetch.js";
import filterProducts from "../../../utils/filterProducts.js";
import toList from "../../../utils/toList.js";
import FetchState from "../../common/FetchState.jsx";
import AdminProductFilters from "../../filters/AdminProductFilters.jsx";
import DeleteError from "../DeleteError.jsx";
import ProductsResults from "./ProductsResults.jsx";

const ProductsList = ({ token }) => {
  const products = useFetch("/products");
  const categories = useFetch("/categories");
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [page, setPage] = useState(1);
  const [deleteError, setDeleteError] = useState(null);
  const all = toList(products.data);

  const setFilter = (name, value) => {
    setFilters((previous) => ({ ...previous, [name]: value }));
    setPage(1);
  };
  // "Eliminar" hace una baja lógica: el producto queda inactivo, no se borra,
  // así los pedidos que ya lo incluyen conservan su historial.
  const deleteProduct = (id) =>
    request(`/products/${id}/status`, {
      method: "PATCH",
      body: { active: false },
      token,
    });
  const handleDeleted = () => {
    setDeleteError(null);
    products.reload();
  };

  return (
    <>
      <AdminProductFilters
        filters={filters}
        categories={toList(categories.data)}
        onChange={setFilter}
      />
      <DeleteError message={deleteError} onClose={() => setDeleteError(null)} />
      <FetchState
        loading={products.loading}
        error={products.error}
        loadingText="Cargando productos..."
      >
        <ProductsResults
          products={filterProducts(all, filters)}
          total={all.length}
          page={page}
          onPageChange={setPage}
          onDelete={deleteProduct}
          onDeleted={handleDeleted}
          onDeleteError={setDeleteError}
        />
      </FetchState>
    </>
  );
};

export default ProductsList;
