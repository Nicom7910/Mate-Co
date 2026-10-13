import { useState } from "react";
import useAction from "../../hooks/useAction.js";
import CancelOrderConfirm from "./CancelOrderConfirm.jsx";
import "./CancelOrderAction.css";

const CancelOrderAction = ({ onCancel, onCancelled }) => {
  const [confirming, setConfirming] = useState(false);
  const { run, sending, error } = useAction(onCancel, onCancelled, () =>
    setConfirming(false),
  );

  return (
    <div className="cancel-order">
      {error && <p className="message message--error">{error}</p>}
      {confirming ? (
        <CancelOrderConfirm
          sending={sending}
          onYes={() => run()}
          onNo={() => setConfirming(false)}
        />
      ) : (
        <button
          type="button"
          className="cancel-order__button"
          onClick={() => setConfirming(true)}
        >
          Cancelar compra
        </button>
      )}
    </div>
  );
};

export default CancelOrderAction;
