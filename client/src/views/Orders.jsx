import OrdersBody from "../components/orders/OrdersBody.jsx";
import OrdersTitle from "../components/orders/OrdersTitle.jsx";
import isAdmin from "../utils/isAdmin.js";

const Orders = ({ token, user, loading }) => {
  const admin = isAdmin(user);

  return (
    <section className="container page">
      <OrdersTitle admin={admin} />
      <OrdersBody token={token} admin={admin} loading={loading} />
    </section>
  );
};

export default Orders;
