import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice.js";
import ProductImage from "../products/ProductImage.jsx";
import ReviewAction from "../reviews/ReviewAction.jsx";
import "./OrderLine.css";

const OrderLine = ({ item, reviewable = false }) => {
  const {
    productId,
    productName,
    imageUrl,
    quantity,
    unitPrice,
    subtotal,
    available = true,
  } = item;

  return (
    <li className="order-line">
      <div className="order-line__row">
        <div className="order-line__image">
          <ProductImage src={imageUrl} alt={productName} />
        </div>
        <div className="order-line__info">
          {available ? (
            <Link to={`/products/${productId}`} className="order-line__name">
              {productName}
            </Link>
          ) : (
            <>
              <span className="order-line__name">{productName}</span>
              <span className="order-line__unavailable">Ya no disponible</span>
            </>
          )}
          <p className="order-line__detail">
            {quantity} × {formatPrice(unitPrice)}
          </p>
        </div>
        <strong className="order-line__subtotal">
          {formatPrice(subtotal)}
        </strong>
      </div>
      {reviewable && (
        <div className="order-line__review">
          <ReviewAction productId={productId} available={available} />
        </div>
      )}
    </li>
  );
};

export default OrderLine;
