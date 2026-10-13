import OrdersBody from "../components/orders/OrdersBody.jsx";
import OrdersTitle from "../components/orders/OrdersTitle.jsx";

const Orders = ({ token }) => (
  <section className="container page">
    <OrdersTitle />
    <OrdersBody token={token} />
  </section>
);

export default Orders;
