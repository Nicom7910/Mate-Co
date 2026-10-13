import ADMIN_PAGE_SIZE from "../../../utils/adminPageSize.js";
import paginate from "../../../utils/paginate.js";
import Pagination from "../../catalog/Pagination.jsx";
import ResultsCount from "../ResultsCount.jsx";
import ProductsTable from "./ProductsTable.jsx";

const ProductsResults = ({
  products,
  total,
  page,
  onPageChange,
  onDelete,
  onDeleted,
  onDeleteError,
}) => {
  if (total === 0)
    return <p className="message">Todavía no hay productos cargados.</p>;
  if (products.length === 0)
    return <p className="message">Ningún producto coincide con la búsqueda.</p>;

  const { items, totalPages, current } = paginate(
    products,
    page,
    ADMIN_PAGE_SIZE,
  );

  return (
    <>
      <ResultsCount
        page={current}
        pageSize={ADMIN_PAGE_SIZE}
        count={products.length}
        total={total}
        noun="productos"
      />
      <ProductsTable
        products={items}
        onDelete={onDelete}
        onDeleted={onDeleted}
        onDeleteError={onDeleteError}
      />
      <Pagination
        page={current}
        totalPages={totalPages}
        onChange={onPageChange}
      />
    </>
  );
};

export default ProductsResults;
