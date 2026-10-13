import { Link } from "react-router-dom";

const AddToCartButton = ({ loggedIn, disabled, sending, onClick }) =>
  loggedIn ? (
    <button
      type="button"
      className="btn btn--primary purchase-actions__button"
      disabled={disabled}
      onClick={onClick}
    >
      {sending ? "Agregando..." : "Agregar al carrito"}
    </button>
  ) : (
    <Link
      to="/login"
      className="btn btn--outline-green purchase-actions__button"
    >
      Ingresá para comprar
    </Link>
  );

export default AddToCartButton;
