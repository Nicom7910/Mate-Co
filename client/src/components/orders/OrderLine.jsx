import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice.js";
import "./OrderLine.css";

const OrderLine = ({ item }) => {
  const { productId, productName, quantity, unitPrice, subtotal } = item;

  return (
    <li className="order-line">
      <div>
        <Link to={`/products/${productId}`} className="order-line__name">
          {productName}
        </Link>
        <p className="order-line__detail">
          {quantity} × {formatPrice(unitPrice)}
        </p>
      </div>
      <strong className="order-line__subtotal">{formatPrice(subtotal)}</strong>
    </li>
  );
};

export default OrderLine;
