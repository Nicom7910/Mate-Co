import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
} from "../../../redux/categoriesSlice.js";
import filterCategories from "../../../utils/filterCategories.js";
import FetchState from "../../common/FetchState.jsx";
import AdminCategoryFilters from "../../filters/AdminCategoryFilters.jsx";
import DeleteError from "../DeleteError.jsx";
import CategoriesResults from "./CategoriesResults.jsx";

const CategoriesList = () => {
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteError, setDeleteError] = useState(null);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <>
      <AdminCategoryFilters search={search} onChange={handleSearch} />
      <DeleteError message={deleteError} onClose={() => setDeleteError(null)} />
      <FetchState
        loading={loading}
        error={error}
        loadingText="Cargando categorías..."
      >
        <CategoriesResults
          categories={filterCategories(categories, search)}
          total={categories.length}
          page={page}
          onPageChange={setPage}
          onDeleted={() => setDeleteError(null)}
          onDeleteError={setDeleteError}
        />
      </FetchState>
    </>
  );
};

export default CategoriesList;
