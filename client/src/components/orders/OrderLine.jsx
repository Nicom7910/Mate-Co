import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice.js";
import ProductImage from "../products/ProductImage.jsx";
import "./OrderLine.css";

const OrderLine = ({ item }) => {
  const { productId, productName, imageUrl, quantity, unitPrice, subtotal } =
    item;

  return (
    <li className="order-line">
      <div className="order-line__image">
        <ProductImage src={imageUrl} alt={productName} />
      </div>
      <div className="order-line__info">
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
