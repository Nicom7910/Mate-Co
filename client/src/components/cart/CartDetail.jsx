import countUnits from "../../utils/countUnits.js";
import CartItems from "./CartItems.jsx";
import CartSummary from "./CartSummary.jsx";
import "./CartDetail.css";

const CartDetail = ({ cart, onChangeQuantity, onRemove, onClear }) => (
  <div className="cart-detail">
    <CartItems
      items={cart.items}
      onChangeQuantity={onChangeQuantity}
      onRemove={onRemove}
    />
    <CartSummary
      count={countUnits(cart)}
      total={cart.total}
      onClear={onClear}
    />
  </div>
);

export default CartDetail;
