const ShipOrderConfirm = ({ sending, onYes, onNo }) => (
  <div className="ship-order__confirm">
    <span className="ship-order__ask">¿Marcar este pedido como enviado?</span>
    <button
      type="button"
      className="ship-order__button ship-order__button--primary"
      disabled={sending}
      onClick={onYes}
    >
      {sending ? "Guardando..." : "Sí, enviado"}
    </button>
    <button
      type="button"
      className="ship-order__button"
      disabled={sending}
      onClick={onNo}
    >
      No
    </button>
  </div>
);

export default ShipOrderConfirm;
