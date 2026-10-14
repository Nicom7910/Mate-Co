import SectionTitle from "../components/common/SectionTitle.jsx";
import StatsPanel from "../components/admin/stats/StatsPanel.jsx";

const AdminStats = ({ token }) => (
  <>
    <SectionTitle title="Estadísticas" />
    <StatsPanel token={token} />
  </>
);

export default AdminStats;
