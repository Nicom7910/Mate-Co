import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice.js";
import QuantitySelector from "../product-detail/QuantitySelector.jsx";
import ProductImage from "../products/ProductImage.jsx";
import "./CartItemRow.css";

const CartItemRow = ({ item, onChangeQuantity, onRemove }) => {
  const {
    productId,
    productName,
    imageUrl,
    unitPrice,
    quantity,
    subtotal,
    available = true,
  } = item;

  return (
    <li className="cart-item">
      <div className="cart-item__image">
        <ProductImage src={imageUrl} alt={productName} />
      </div>
      <div className="cart-item__info">
        <Link to={`/products/${productId}`} className="cart-item__name">
          {productName}
        </Link>
        <span className="cart-item__price">{formatPrice(unitPrice)} c/u</span>
        {!available && (
          <span className="cart-item__unavailable" role="alert">
            Este producto ya no está disponible. Quitalo para continuar.
          </span>
        )}
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => onRemove(productId)}
        >
          Quitar
        </button>
      </div>
      <QuantitySelector
        disabled={!available}
        value={quantity}
        onChange={(value) => onChangeQuantity(productId, value)}
      />
      <strong className="cart-item__subtotal">{formatPrice(subtotal)}</strong>
    </li>
  );
};

export default CartItemRow;
