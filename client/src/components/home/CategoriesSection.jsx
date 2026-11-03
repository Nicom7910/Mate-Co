import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
} from "../../redux/categoriesSlice.js";
import CategoryList from "../categories/CategoryList.jsx";
import FetchState from "../common/FetchState.jsx";
import SectionTitle from "../common/SectionTitle.jsx";

const CategoriesSection = () => {
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  return (
    <section className="container section">
      <SectionTitle title="Categorías" centered />
      <FetchState
        loading={loading}
        error={error}
        loadingText="Cargando categorías..."
      >
        <CategoryList categories={categories} />
      </FetchState>
    </section>
  );
};

export default CategoriesSection;
