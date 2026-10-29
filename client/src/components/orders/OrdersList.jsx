import { useSelector } from "react-redux";
import useLoad from "../../hooks/useLoad.js";
import {
  fetchOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersLoading,
} from "../../redux/ordersSlice.js";
import confirmedOrders from "../../utils/confirmedOrders.js";
import FetchState from "../common/FetchState.jsx";
import OrdersEmpty from "./OrdersEmpty.jsx";
import OrdersResults from "./OrdersResults.jsx";

const OrdersList = ({ admin }) => {
  useLoad(fetchOrders, admin);
  const orders = confirmedOrders(useSelector(selectOrders));
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

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
