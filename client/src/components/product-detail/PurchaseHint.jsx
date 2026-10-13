const PurchaseHint = ({ stock, isAdmin }) => {
  if (isAdmin)
    return (
      <p className="purchase-actions__hint">
        Las cuentas de administrador no pueden comprar.
      </p>
    );
  if (stock === 0) return null;

  return (
    <p className="purchase-actions__hint">
      Podés llevar hasta {stock} {stock === 1 ? "unidad" : "unidades"} por
      compra.
    </p>
  );
};

export default PurchaseHint;
