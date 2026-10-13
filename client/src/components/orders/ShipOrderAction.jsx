import { useState } from "react";
import useAction from "../../hooks/useAction.js";
import ShipOrderConfirm from "./ShipOrderConfirm.jsx";
import "./ShipOrderAction.css";

const ShipOrderAction = ({ onShip, onShipped }) => {
  const [confirming, setConfirming] = useState(false);
  const { run, sending, error } = useAction(onShip, onShipped, () =>
    setConfirming(false),
  );

  return (
    <div className="ship-order">
      {error && <p className="message message--error">{error}</p>}
      {confirming ? (
        <ShipOrderConfirm
          sending={sending}
          onYes={() => run()}
          onNo={() => setConfirming(false)}
        />
      ) : (
        <button
          type="button"
          className="ship-order__button ship-order__button--primary"
          onClick={() => setConfirming(true)}
        >
          Marcar como enviado
        </button>
      )}
    </div>
  );
};

export default ShipOrderAction;
