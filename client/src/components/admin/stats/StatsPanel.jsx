import { useSelector } from "react-redux";
import useLoad from "../../../hooks/useLoad.js";
import {
  fetchStats,
  selectStats,
  selectStatsError,
  selectStatsLoading,
} from "../../../redux/statsSlice.js";
import FetchState from "../../common/FetchState.jsx";
import StatsCards from "./StatsCards.jsx";
import TopProducts from "./TopProducts.jsx";

const StatsPanel = () => {
  useLoad(fetchStats);
  const stats = useSelector(selectStats);
  const loading = useSelector(selectStatsLoading);
  const error = useSelector(selectStatsError);

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando estadísticas..."
    >
      {stats && (
        <>
          <StatsCards stats={stats} />
          <TopProducts products={stats.topProducts} />
        </>
      )}
    </FetchState>
  );
};

export default StatsPanel;
