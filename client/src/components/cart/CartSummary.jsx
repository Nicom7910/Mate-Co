import useAction from "../../hooks/useAction.js";
import formatPrice from "../../utils/formatPrice.js";
import CartError from "./CartError.jsx";
import "./CartSummary.css";

const CartSummary = ({ count, total, onCheckout, onClear, onConfirmed }) => {
  const checkout = useAction(onCheckout, onConfirmed);
  const clear = useAction(onClear);
  const busy = checkout.sending || clear.sending;

  return (
    <aside className="cart-summary">
      <h2 className="cart-summary__title">Resumen</h2>
      <p className="cart-summary__row">
        <span>
          {count} {count === 1 ? "unidad" : "unidades"}
        </span>
        <strong className="cart-summary__total">{formatPrice(total)}</strong>
      </p>
      <CartError message={checkout.error ?? clear.error} />
      <button
        type="button"
        className="btn btn--primary cart-summary__button"
        disabled={busy}
        onClick={() => checkout.run()}
      >
        {checkout.sending ? "Confirmando..." : "Confirmar compra"}
      </button>
      <button
        type="button"
        className="btn btn--outline cart-summary__button"
        disabled={busy}
        onClick={() => clear.run()}
      >
        Vaciar carrito
      </button>
    </aside>
  );
};

export default CartSummary;
