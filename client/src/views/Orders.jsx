import { useSelector } from "react-redux";
import OrdersBody from "../components/orders/OrdersBody.jsx";
import OrdersTitle from "../components/orders/OrdersTitle.jsx";
import { selectIsAdmin } from "../redux/userSlice.js";

const Orders = () => {
  const admin = useSelector(selectIsAdmin);

  return (
    <section className="container page">
      <OrdersTitle admin={admin} />
      <OrdersBody admin={admin} />
    </section>
  );
};

export default Orders;
