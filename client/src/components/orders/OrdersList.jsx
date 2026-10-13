import useFetch from "../../hooks/useFetch.js";
import confirmedOrders from "../../utils/confirmedOrders.js";
import CartNotice from "../cart/CartNotice.jsx";
import FetchState from "../common/FetchState.jsx";
import OrderCard from "./OrderCard.jsx";
import "./OrdersList.css";

const OrdersList = ({ token }) => {
  const { data, loading, error } = useFetch("/orders/me", token);
  const orders = data ? confirmedOrders(data) : [];

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando tus pedidos..."
    >
      {orders.length === 0 ? (
        <CartNotice
          text="Todavía no hiciste ninguna compra."
          to="/products"
          buttonText="Ver productos"
        />
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ul>
      )}
    </FetchState>
  );
};

export default OrdersList;
