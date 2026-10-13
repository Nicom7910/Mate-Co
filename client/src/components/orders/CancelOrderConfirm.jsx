const CancelOrderConfirm = ({ sending, onYes, onNo }) => (
  <div className="cancel-order__confirm">
    <span className="cancel-order__ask">¿Querés cancelar esta compra?</span>
    <button
      type="button"
      className="cancel-order__button cancel-order__button--danger"
      disabled={sending}
      onClick={onYes}
    >
      {sending ? "Cancelando..." : "Sí, cancelar"}
    </button>
    <button
      type="button"
      className="cancel-order__button"
      disabled={sending}
      onClick={onNo}
    >
      No
    </button>
  </div>
);

export default CancelOrderConfirm;
