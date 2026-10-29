import { useSelector } from "react-redux";
import { selectToken } from "../../redux/authSlice.js";
import { selectUserLoading } from "../../redux/userSlice.js";
import CartNotice from "../cart/CartNotice.jsx";
import OrdersList from "./OrdersList.jsx";

const OrdersBody = ({ admin }) => {
  const token = useSelector(selectToken);
  const loading = useSelector(selectUserLoading);

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
