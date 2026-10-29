import { useSelector } from "react-redux";
import { selectToken } from "../../redux/authSlice.js";
import {
  selectCart,
  selectCartError,
  selectCartLoading,
} from "../../redux/cartSlice.js";
import { selectUserLoading } from "../../redux/userSlice.js";
import FetchState from "../common/FetchState.jsx";
import CartDetail from "./CartDetail.jsx";
import CartNotice from "./CartNotice.jsx";

const CartBody = () => {
  const token = useSelector(selectToken);
  const cart = useSelector(selectCart);
  const cartLoading = useSelector(selectCartLoading);
  const cartError = useSelector(selectCartError);
  const userLoading = useSelector(selectUserLoading);

  if (!token)
    return (
      <CartNotice
        text="Ingresá para ver tu carrito."
        to="/login"
        buttonText="Ingresar"
      />
    );

  return (
    <FetchState
      loading={!cart && (userLoading || cartLoading)}
      error={cartError}
      loadingText="Cargando tu carrito..."
    >
      {!cart || cart.items.length === 0 ? (
        <CartNotice
          text="Tu carrito está vacío."
          to="/products"
          buttonText="Ver productos"
        />
      ) : (
        <CartDetail cart={cart} />
      )}
    </FetchState>
  );
};

export default CartBody;
