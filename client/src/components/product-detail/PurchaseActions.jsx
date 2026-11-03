import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../hooks/useAction.js";
import { selectToken } from "../../redux/authSlice.js";
import { addToCart } from "../../redux/cartSlice.js";
import { selectIsAdmin } from "../../redux/userSlice.js";
import AddToCartButton from "./AddToCartButton.jsx";
import AddToCartMessage from "./AddToCartMessage.jsx";
import PurchaseHint from "./PurchaseHint.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
import "./PurchaseActions.css";

const PurchaseActions = ({ productId, stock }) => {
  const dispatch = useDispatch();
  const loggedIn = Boolean(useSelector(selectToken));
  const isAdmin = useSelector(selectIsAdmin);
  const [quantity, setQuantity] = useState(1);
  const { run, sending, error } = useAction((id, units) =>
    dispatch(addToCart({ productId: id, quantity: units })).unwrap(),
  );

  const handleAdd = () => run(productId, quantity);

  return (
    <>
      <div className="purchase-actions">
        <QuantitySelector
          value={quantity}
          max={stock}
          disabled={isAdmin}
          onChange={setQuantity}
        />
        <AddToCartButton
          loggedIn={loggedIn}
          disabled={isAdmin || stock === 0 || sending}
          sending={sending}
          onClick={handleAdd}
        />
      </div>
      <AddToCartMessage error={error} />
      <PurchaseHint stock={stock} isAdmin={isAdmin} />
    </>
  );
};

export default PurchaseActions;
