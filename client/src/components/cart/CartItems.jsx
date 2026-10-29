import { useDispatch } from "react-redux";
import useAction from "../../hooks/useAction.js";
import { changeQuantity, removeItem } from "../../redux/cartSlice.js";
import CartError from "./CartError.jsx";
import CartItemRow from "./CartItemRow.jsx";
import "./CartItems.css";

const CartItems = ({ items }) => {
  const dispatch = useDispatch();
  const change = useAction((productId, quantity) =>
    dispatch(changeQuantity({ productId, quantity })).unwrap(),
  );
  const remove = useAction((productId) =>
    dispatch(removeItem(productId)).unwrap(),
  );

  return (
    <div className="cart-items">
      <ul className="cart-items__list">
        {items.map((item) => (
          <CartItemRow
            key={item.productId}
            item={item}
            onChangeQuantity={change.run}
            onRemove={remove.run}
          />
        ))}
      </ul>
      <CartError message={change.error ?? remove.error} />
    </div>
  );
};

export default CartItems;
