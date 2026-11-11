import { useSelector } from "react-redux";
import useCatalogFilters from "../../hooks/useCatalogFilters.js";
import useLoad from "../../hooks/useLoad.js";
import usePageChange from "../../hooks/usePageChange.js";
import { selectCategories } from "../../redux/categoriesSlice.js";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../redux/productsSlice.js";
import filterProducts from "../../utils/filterProducts.js";
import paginate from "../../utils/paginate.js";
import FetchState from "../common/FetchState.jsx";
import CatalogFilters from "../filters/CatalogFilters.jsx";
import SearchBar from "../filters/SearchBar.jsx";
import ProductGrid from "../products/ProductGrid.jsx";
import CatalogTitle from "./CatalogTitle.jsx";
import Pagination from "./Pagination.jsx";
import "./ProductCatalog.css";

const PAGE_SIZE = 9;

const ProductCatalog = () => {
  useLoad(fetchProducts);
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const categories = useSelector(selectCategories);
  const { filters, setFilter, page, setPage } = useCatalogFilters();
  const visible = filterProducts(products, filters);
  const { items, totalPages, current } = paginate(visible, page, PAGE_SIZE);
  const { targetRef, changePage } = usePageChange(setPage);

  return (
    <>
      <CatalogTitle count={loading ? null : visible.length} />
      <div className="catalog">
        <CatalogFilters
          categories={categories}
          filters={filters}
          onChange={setFilter}
        />
        <div className="catalog__results">
          <SearchBar
            value={filters.search}
            onChange={(value) => setFilter("search", value)}
          />
          <FetchState
            loading={loading}
            error={error}
            loadingText="Cargando productos..."
          >
            <div ref={targetRef} className="scroll-target">
              <ProductGrid products={items} />
            </div>
            <Pagination
              page={current}
              totalPages={totalPages}
              onChange={changePage}
            />
          </FetchState>
        </div>
      </div>
    </>
  );
};

export default ProductCatalog;
