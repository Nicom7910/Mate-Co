import CartNotice from "../cart/CartNotice.jsx";
import OrdersList from "./OrdersList.jsx";

const OrdersBody = ({ token, admin, loading }) => {
  if (!token)
    return (
      <CartNotice
        text="Ingresá para ver tus pedidos."
        to="/login"
        buttonText="Ingresar"
      />
    );
  if (loading) return <p className="message">Cargando pedidos...</p>;

  return <OrdersList key={String(admin)} token={token} admin={admin} />;
};

export default OrdersBody;
