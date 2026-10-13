import request from "../../api/request.js";
import useFetch from "../../hooks/useFetch.js";
import confirmedOrders from "../../utils/confirmedOrders.js";
import toList from "../../utils/toList.js";
import FetchState from "../common/FetchState.jsx";
import OrdersEmpty from "./OrdersEmpty.jsx";
import OrdersResults from "./OrdersResults.jsx";

const OrdersList = ({ token, admin }) => {
  const { data, loading, error, reload } = useFetch(
    admin ? "/orders" : "/orders/me",
    token,
  );
  const orders = confirmedOrders(toList(data));
  const cancelOrder = (id) =>
    request(`/orders/${id}/cancel`, { method: "PATCH", token });
  const shipOrder = (id) =>
    request(`/orders/${id}/ship`, { method: "PATCH", token });

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando pedidos..."
    >
      {orders.length === 0 ? (
        <OrdersEmpty admin={admin} />
      ) : (
        <OrdersResults
          orders={orders}
          admin={admin}
          onCancel={admin ? undefined : cancelOrder}
          onCancelled={reload}
          onShip={admin ? shipOrder : undefined}
          onShipped={reload}
        />
      )}
    </FetchState>
  );
};

export default OrdersList;
