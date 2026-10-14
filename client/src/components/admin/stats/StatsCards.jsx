import formatPrice from "../../../utils/formatPrice.js";
import StatCard from "./StatCard.jsx";
import "./StatsCards.css";

const StatsCards = ({ stats }) => {
  const cards = [
    { label: "Ventas", value: stats.salesCount, hint: "pedidos confirmados" },
    {
      label: "Dinero acumulado",
      value: formatPrice(stats.salesAmount),
      hint: "de las ventas",
    },
    {
      label: "Devoluciones",
      value: stats.returnsCount,
      hint: "compras canceladas",
    },
    {
      label: "Dinero devuelto",
      value: formatPrice(stats.returnsAmount),
      hint: "de las devoluciones",
    },
  ];

  return (
    <ul className="stats-cards">
      {cards.map(({ label, value, hint }) => (
        <StatCard key={label} label={label} value={value} hint={hint} />
      ))}
    </ul>
  );
};

export default StatsCards;
