import { useState } from "react";
import useAction from "../../hooks/useAction.js";
import AddToCartButton from "./AddToCartButton.jsx";
import AddToCartMessage from "./AddToCartMessage.jsx";
import PurchaseHint from "./PurchaseHint.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
import "./PurchaseActions.css";

const PurchaseActions = ({
  productId,
  stock,
  loggedIn,
  isAdmin,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { run, sending, error } = useAction(onAddToCart, () => setAdded(true));

  const handleAdd = () => {
    setAdded(false);
    run(productId, quantity);
  };

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
      <AddToCartMessage error={error} added={added} />
      <PurchaseHint stock={stock} isAdmin={isAdmin} />
    </>
  );
};

export default PurchaseActions;
