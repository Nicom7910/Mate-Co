import formatPrice from "../../utils/formatPrice.js";
import "./PriceTag.css";

const PriceTag = ({ price, finalPrice }) => {
  const current = finalPrice ?? price;

  return (
    <div className="price-tag">
      <span className="price-tag__final">{formatPrice(current)}</span>
      {current < price && (
        <span className="price-tag__old">{formatPrice(price)}</span>
      )}
    </div>
  );
};

export default PriceTag;
