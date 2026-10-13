import { useState } from "react";
import CartDetail from "./CartDetail.jsx";
import CartNotice from "./CartNotice.jsx";
import OrderConfirmed from "./OrderConfirmed.jsx";

const CartBody = ({ loggedIn, cart, ...actions }) => {
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!loggedIn)
    return (
      <CartNotice
        text="Ingresá para ver tu carrito."
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
  return (
    <CartDetail cart={cart} onConfirmed={setConfirmedOrder} {...actions} />
  );
};

export default CartBody;
