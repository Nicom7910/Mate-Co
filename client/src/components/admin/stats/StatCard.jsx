import "./StatCard.css";

const StatCard = ({ label, value, hint }) => (
  <li className="stat-card">
    <p className="stat-card__label">{label}</p>
    <p className="stat-card__value">{value}</p>
    <p className="stat-card__hint">{hint}</p>
  </li>
);

export default StatCard;
