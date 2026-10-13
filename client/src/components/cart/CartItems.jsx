import useAction from "../../hooks/useAction.js";
import CartError from "./CartError.jsx";
import CartItemRow from "./CartItemRow.jsx";
import "./CartItems.css";

const CartItems = ({ items, onChangeQuantity, onRemove }) => {
  const change = useAction(onChangeQuantity);
  const remove = useAction(onRemove);

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
