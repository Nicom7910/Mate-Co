import CartNotice from "../cart/CartNotice.jsx";
import OrdersList from "./OrdersList.jsx";

const OrdersBody = ({ token }) =>
  token ? (
    <OrdersList token={token} />
  ) : (
    <CartNotice
      text="Ingresá para ver tus pedidos."
      to="/login"
      buttonText="Ingresar"
    />
  );

export default OrdersBody;
