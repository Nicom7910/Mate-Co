import useFetch from "../../../hooks/useFetch.js";
import FetchState from "../../common/FetchState.jsx";
import StatsCards from "./StatsCards.jsx";
import TopProducts from "./TopProducts.jsx";

const StatsPanel = ({ token }) => {
  const { data, loading, error } = useFetch("/stats", token);

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando estadísticas..."
    >
      {data && (
        <>
          <StatsCards stats={data} />
          <TopProducts products={data.topProducts} />
        </>
      )}
    </FetchState>
  );
};

export default StatsPanel;
