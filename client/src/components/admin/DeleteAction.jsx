import { useState } from "react";
import useAction from "../../hooks/useAction.js";
import "./AdminActions.css";

const DeleteAction = ({ onDelete, onDeleted, onError }) => {
  const [confirming, setConfirming] = useState(false);

  const handleError = (message) => {
    setConfirming(false);
    onError(message);
  };
  const { run, sending } = useAction(onDelete, onDeleted, handleError);

  return confirming ? (
    <div className="admin-actions__delete">
      <span className="admin-actions__ask">¿Eliminar?</span>
      <button
        type="button"
        className="admin-action admin-action--danger"
        disabled={sending}
        onClick={() => run()}
      >
        {sending ? "Eliminando..." : "Sí"}
      </button>
      <button
        type="button"
        className="admin-action"
        disabled={sending}
        onClick={() => setConfirming(false)}
      >
        No
      </button>
    </div>
  ) : (
    <button
      type="button"
      className="admin-action"
      onClick={() => setConfirming(true)}
    >
      Eliminar
    </button>
  );
};

export default DeleteAction;
