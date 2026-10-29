import { useState } from "react";
import { useDispatch } from "react-redux";
import useAction from "../../hooks/useAction.js";
import { shipOrder } from "../../redux/ordersSlice.js";
import ShipOrderConfirm from "./ShipOrderConfirm.jsx";
import "./ShipOrderAction.css";

const ShipOrderAction = ({ orderId }) => {
  const dispatch = useDispatch();
  const [confirming, setConfirming] = useState(false);
  const { run, sending, error } = useAction(
    () => dispatch(shipOrder(orderId)).unwrap(),
    undefined,
    () => setConfirming(false),
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
