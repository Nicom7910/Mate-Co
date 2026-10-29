import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/authSlice.js";
import { selectCart, selectCartLoading } from "../../redux/cartSlice.js";
import { selectUser, selectUserLoading } from "../../redux/userSlice.js";
import CartNotice from "../cart/CartNotice.jsx";
import OrderConfirmed from "../cart/OrderConfirmed.jsx";
import CheckoutDetail from "./CheckoutDetail.jsx";

const CheckoutBody = () => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const userLoading = useSelector(selectUserLoading);
  const cart = useSelector(selectCart);
  const cartLoading = useSelector(selectCartLoading);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!token)
    return (
      <CartNotice
        text="Ingresá para finalizar tu compra."
        to="/login"
        buttonText="Ingresar"
      />
    );
  if (confirmedOrder) return <OrderConfirmed order={confirmedOrder} />;
  if (userLoading || (cartLoading && !cart))
    return <p className="message">Cargando tus datos...</p>;
  if (!cart || cart.items.length === 0) {
    return (
      <CartNotice
        text="Tu carrito está vacío."
        to="/products"
        buttonText="Ver productos"
      />
    );
  }
  if (!user)
    return (
      <CartNotice
        text="No pudimos cargar tus datos."
        to="/login"
        buttonText="Ingresar de nuevo"
      />
    );

  return <CheckoutDetail cart={cart} user={user} onPaid={setConfirmedOrder} />;
};

export default CheckoutBody;
