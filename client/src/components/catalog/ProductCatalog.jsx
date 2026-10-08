import useCatalogFilters from "../../hooks/useCatalogFilters.js";
import useFetch from "../../hooks/useFetch.js";
import filterProducts from "../../utils/filterProducts.js";
import paginate from "../../utils/paginate.js";
import toList from "../../utils/toList.js";
import FetchState from "../common/FetchState.jsx";
import CatalogFilters from "../filters/CatalogFilters.jsx";
import SearchBar from "../filters/SearchBar.jsx";
import ProductGrid from "../products/ProductGrid.jsx";
import CatalogTitle from "./CatalogTitle.jsx";
import Pagination from "./Pagination.jsx";
import "./ProductCatalog.css";

const PAGE_SIZE = 9;

const ProductCatalog = () => {
  const products = useFetch("/products");
  const categories = useFetch("/categories");
  const { filters, setFilter, page, setPage } = useCatalogFilters();
  const visible = filterProducts(toList(products.data), filters);
  const { items, totalPages, current } = paginate(visible, page, PAGE_SIZE);

  return (
    <>
      <CatalogTitle count={products.data ? visible.length : null} />
      <div className="catalog">
        <CatalogFilters
          categories={toList(categories.data)}
          filters={filters}
          onChange={setFilter}
        />
        <div className="catalog__results">
          <SearchBar
            value={filters.search}
            onChange={(value) => setFilter("search", value)}
          />
          <FetchState
            loading={products.loading}
            error={products.error}
            loadingText="Cargando productos..."
          >
            <ProductGrid products={items} />
            <Pagination
              page={current}
              totalPages={totalPages}
              onChange={setPage}
            />
          </FetchState>
        </div>
      </div>
    </>
  );
};

export default ProductCatalog;
