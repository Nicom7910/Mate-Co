import CartDetail from "./CartDetail.jsx";
import CartNotice from "./CartNotice.jsx";

const CartBody = ({ loggedIn, cart, ...actions }) => {
  if (!loggedIn)
    return (
      <CartNotice
        text="Ingresá para ver tu carrito."
        to="/login"
        buttonText="Ingresar"
      />
    );
  if (!cart || cart.items.length === 0) {
    return (
      <CartNotice
        text="Tu carrito está vacío."
        to="/products"
        buttonText="Ver productos"
      />
    );
  }
  return <CartDetail cart={cart} {...actions} />;
};

export default CartBody;
