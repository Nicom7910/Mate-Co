import formatPrice from "../../utils/formatPrice.js";
import "./CheckoutSummary.css";

const CheckoutSummary = ({ items, total }) => (
  <aside className="checkout-summary">
    <h2 className="checkout-summary__title">Tu pedido</h2>
    <ul className="checkout-summary__list">
      {items.map(({ productId, productName, quantity, subtotal }) => (
        <li key={productId} className="checkout-summary__line">
          <span>
            {productName}{" "}
            <span className="checkout-summary__quantity">× {quantity}</span>
          </span>
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
