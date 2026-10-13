import { Link } from "react-router-dom";
import useAction from "../../hooks/useAction.js";
import formatPrice from "../../utils/formatPrice.js";
import CartError from "./CartError.jsx";
import "./CartSummary.css";

const CartSummary = ({ count, total, onClear }) => {
  const clear = useAction(onClear);

  return (
    <aside className="cart-summary">
      <h2 className="cart-summary__title">Resumen</h2>
      <p className="cart-summary__row">
        <span>
          {count} {count === 1 ? "unidad" : "unidades"}
        </span>
        <strong className="cart-summary__total">{formatPrice(total)}</strong>
      </p>
      <CartError message={clear.error} />
      <Link to="/checkout" className="btn btn--primary cart-summary__button">
        Confirmar compra
      </Link>
      <button
        type="button"
        className="btn btn--outline cart-summary__button"
        disabled={clear.sending}
        onClick={() => clear.run()}
      >
        Vaciar carrito
      </button>
    </aside>
  );
};

export default CartSummary;
