import { useState } from "react";
import request from "../../../api/request.js";
import useFetch from "../../../hooks/useFetch.js";
import filterCategories from "../../../utils/filterCategories.js";
import toList from "../../../utils/toList.js";
import FetchState from "../../common/FetchState.jsx";
import AdminCategoryFilters from "../../filters/AdminCategoryFilters.jsx";
import DeleteError from "../DeleteError.jsx";
import CategoriesResults from "./CategoriesResults.jsx";

const CategoriesList = ({ token }) => {
  const { data, loading, error, reload } = useFetch("/categories");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteError, setDeleteError] = useState(null);
  const all = toList(data);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };
  const deleteCategory = (id) =>
    request(`/categories/${id}`, { method: "DELETE", token });
  const handleDeleted = () => {
    setDeleteError(null);
    reload();
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
          categories={filterCategories(all, search)}
          total={all.length}
          page={page}
          onPageChange={setPage}
          onDelete={deleteCategory}
          onDeleted={handleDeleted}
          onDeleteError={setDeleteError}
        />
      </FetchState>
    </>
  );
};

export default CategoriesList;
