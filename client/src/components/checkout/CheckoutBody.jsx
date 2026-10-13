import { useState } from "react";
import CartNotice from "../cart/CartNotice.jsx";
import OrderConfirmed from "../cart/OrderConfirmed.jsx";
import CheckoutDetail from "./CheckoutDetail.jsx";

const CheckoutBody = ({ loggedIn, user, loading, cart, onCheckout }) => {
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!loggedIn)
    return (
      <CartNotice
        text="Ingresá para finalizar tu compra."
        to="/login"
        buttonText="Ingresar"
      />
    );
  if (confirmedOrder) return <OrderConfirmed order={confirmedOrder} />;
  if (!cart || cart.items.length === 0) {
    return (
      <CartNotice
        text="Tu carrito está vacío."
        to="/products"
        buttonText="Ver productos"
      />
    );
  }
  if (loading) return <p className="message">Cargando tus datos...</p>;
  if (!user)
    return (
      <CartNotice
        text="No pudimos cargar tus datos."
        to="/login"
        buttonText="Ingresar de nuevo"
      />
    );

  return (
    <CheckoutDetail
      cart={cart}
      user={user}
      onCheckout={onCheckout}
      onPaid={setConfirmedOrder}
    />
  );
};

export default CheckoutBody;
