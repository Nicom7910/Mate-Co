import formatPrice from "../../utils/formatPrice.js";
import ProductImage from "../products/ProductImage.jsx";
import "./CheckoutSummary.css";

const CheckoutSummary = ({ items, total }) => (
  <aside className="checkout-summary">
    <h2 className="checkout-summary__title">Tu pedido</h2>
    <ul className="checkout-summary__list">
      {items.map(({ productId, productName, imageUrl, quantity, subtotal }) => (
        <li key={productId} className="checkout-summary__line">
          <div className="checkout-summary__image">
            <ProductImage src={imageUrl} alt={productName} />
          </div>
          <div className="checkout-summary__info">
            <span className="checkout-summary__name">{productName}</span>
            <span className="checkout-summary__quantity">× {quantity}</span>
          </div>
          <strong>{formatPrice(subtotal)}</strong>
        </li>
      ))}
    </ul>
    <p className="checkout-summary__total">
      Total <strong>{formatPrice(total)}</strong>
    </p>
  </aside>
);

export default CheckoutSummary;
