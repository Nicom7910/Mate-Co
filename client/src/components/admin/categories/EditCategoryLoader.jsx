import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch.js";
import FetchState from "../../common/FetchState.jsx";
import CategoryEditor from "./CategoryEditor.jsx";

const EditCategoryLoader = ({ token }) => {
  const { id } = useParams();
  const { data: category, loading, error } = useFetch(`/categories/${id}`);

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando categoría..."
    >
      {category && <CategoryEditor token={token} category={category} />}
    </FetchState>
  );
};

export default EditCategoryLoader;
