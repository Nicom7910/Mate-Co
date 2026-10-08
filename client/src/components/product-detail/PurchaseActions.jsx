import { useState } from "react";
import QuantitySelector from "./QuantitySelector.jsx";
import "./PurchaseActions.css";

const PurchaseActions = ({ stock }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="purchase-actions">
        <QuantitySelector value={quantity} max={stock} onChange={setQuantity} />
        <button
          type="button"
          className="btn btn--primary purchase-actions__button"
          disabled={stock === 0}
        >
          Agregar al carrito
        </button>
      </div>
      {stock > 0 && (
        <p className="purchase-actions__hint">
          Podés llevar hasta {stock} {stock === 1 ? "unidad" : "unidades"} por
          compra.
        </p>
      )}
    </>
  );
};

export default PurchaseActions;
