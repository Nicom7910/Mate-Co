import useFetch from "../../hooks/useFetch.js";
import toList from "../../utils/toList.js";
import CategoryList from "../categories/CategoryList.jsx";
import FetchState from "../common/FetchState.jsx";
import SectionTitle from "../common/SectionTitle.jsx";

const CategoriesSection = () => {
  const { data, loading, error } = useFetch("/categories");

  return (
    <section className="container section">
      <SectionTitle title="Categorías" />
      <FetchState
        loading={loading}
        error={error}
        loadingText="Cargando categorías..."
      >
        <CategoryList categories={toList(data)} />
      </FetchState>
    </section>
  );
};

export default CategoriesSection;
