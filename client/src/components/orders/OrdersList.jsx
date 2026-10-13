import useFetch from "../../hooks/useFetch.js";
import confirmedOrders from "../../utils/confirmedOrders.js";
import toList from "../../utils/toList.js";
import FetchState from "../common/FetchState.jsx";
import OrdersEmpty from "./OrdersEmpty.jsx";
import OrdersResults from "./OrdersResults.jsx";

const OrdersList = ({ token, admin }) => {
  const { data, loading, error } = useFetch(
    admin ? "/orders" : "/orders/me",
    token,
  );
  const orders = confirmedOrders(toList(data));

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando pedidos..."
    >
      {orders.length === 0 ? (
        <OrdersEmpty admin={admin} />
      ) : (
        <OrdersResults orders={orders} admin={admin} />
      )}
    </FetchState>
  );
};

export default OrdersList;
