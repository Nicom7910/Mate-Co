import "./DiscountBadge.css";

const DiscountBadge = ({ percentage }) => (
  <span className="discount-badge">-{percentage}%</span>
);

export default DiscountBadge;
