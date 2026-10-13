import { Link } from "react-router-dom";
import "./AddToCartMessage.css";

const AddToCartMessage = ({ error, added }) => {
  if (error) {
    return (
      <p className="message message--error add-to-cart-message" role="alert">
        {error}
      </p>
    );
  }
  if (added) {
    return (
      <p
        className="message add-to-cart-message add-to-cart-message--ok"
        role="status"
      >
        ¡Agregado al carrito! <Link to="/cart">Ver carrito</Link>
      </p>
    );
  }
  return null;
};

export default AddToCartMessage;
