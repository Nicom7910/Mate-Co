import LinkButton from "../common/LinkButton.jsx";
import "./CartNotice.css";

const CartNotice = ({ text, to, buttonText }) => (
  <div className="cart-notice">
    <p className="cart-notice__text">{text}</p>
    <LinkButton to={to}>{buttonText}</LinkButton>
  </div>
);

export default CartNotice;
