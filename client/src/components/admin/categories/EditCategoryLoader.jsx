import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useLoad from "../../../hooks/useLoad.js";
import {
  fetchCategory,
  selectCategory,
  selectCategoryError,
  selectCategoryLoading,
} from "../../../redux/categoriesSlice.js";
import FetchState from "../../common/FetchState.jsx";
import CategoryEditor from "./CategoryEditor.jsx";

const EditCategoryLoader = () => {
  const { id } = useParams();
  useLoad(fetchCategory, id);
  const category = useSelector(selectCategory(id));
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando categoría..."
    >
      {category && <CategoryEditor category={category} />}
    </FetchState>
  );
};

export default EditCategoryLoader;
