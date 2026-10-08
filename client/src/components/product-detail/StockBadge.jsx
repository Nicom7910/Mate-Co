import "./StockBadge.css";

const StockBadge = ({ stock }) => {
  const available = stock > 0;

  return (
    <span className={`stock-badge ${available ? "" : "stock-badge--empty"}`}>
      {available
        ? `Stock disponible: ${stock} ${stock === 1 ? "unidad" : "unidades"}`
        : "Sin stock"}
    </span>
  );
};

export default StockBadge;
