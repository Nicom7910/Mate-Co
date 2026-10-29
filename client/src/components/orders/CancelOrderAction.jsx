import { useState } from "react";
import { useDispatch } from "react-redux";
import useAction from "../../hooks/useAction.js";
import { cancelOrder } from "../../redux/ordersSlice.js";
import CancelOrderConfirm from "./CancelOrderConfirm.jsx";
import "./CancelOrderAction.css";

const CancelOrderAction = ({ orderId }) => {
  const dispatch = useDispatch();
  const [confirming, setConfirming] = useState(false);
  const { run, sending, error } = useAction(
    () => dispatch(cancelOrder(orderId)).unwrap(),
    undefined,
    () => setConfirming(false),
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
