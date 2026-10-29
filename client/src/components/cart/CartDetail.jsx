import countUnits from "../../utils/countUnits.js";
import CartItems from "./CartItems.jsx";
import CartSummary from "./CartSummary.jsx";
import "./CartDetail.css";

const CartDetail = ({ cart }) => (
  <div className="cart-detail">
    <CartItems items={cart.items} />
    <CartSummary
      count={countUnits(cart)}
      total={cart.total}
      blocked={cart.items.some((item) => item.available === false)}
    />
  </div>
);

export default CartDetail;
