import ADMIN_PAGE_SIZE from "../../../utils/adminPageSize.js";
import paginate from "../../../utils/paginate.js";
import Pagination from "../../catalog/Pagination.jsx";
import ResultsCount from "../ResultsCount.jsx";
import CategoriesTable from "./CategoriesTable.jsx";

const CategoriesResults = ({
  categories,
  total,
  page,
  onPageChange,
  onDelete,
  onDeleted,
  onDeleteError,
}) => {
  if (total === 0)
    return <p className="message">Todavía no hay categorías cargadas.</p>;
  if (categories.length === 0)
    return (
      <p className="message">Ninguna categoría coincide con la búsqueda.</p>
    );

  const { items, totalPages, current } = paginate(
    categories,
    page,
    ADMIN_PAGE_SIZE,
  );

  return (
    <>
      <ResultsCount
        page={current}
        pageSize={ADMIN_PAGE_SIZE}
        count={categories.length}
        total={total}
        noun="categorías"
      />
      <CategoriesTable
        categories={items}
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

export default CategoriesResults;
