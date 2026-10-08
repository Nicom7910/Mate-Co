import { Link } from "react-router-dom";
import "./CartLink.css";

const CartLink = ({ count = 0 }) => (
  <Link to="/cart" className="cart-link" aria-label="Carrito">
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.4 12h11l2.1-8H6" />
    </svg>
    Carrito
    {count > 0 && <span className="cart-link__badge">{count}</span>}
  </Link>
);

export default CartLink;
