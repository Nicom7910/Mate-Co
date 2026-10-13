import formatDate from "../../utils/formatDate.js";
import OrderStatusBadge from "./OrderStatusBadge.jsx";
import "./OrderHeader.css";

const OrderHeader = ({ id, orderDate, status, customer }) => (
  <header className="order-header">
    <div>
      <h2 className="order-header__title">Pedido #{id}</h2>
      <p className="order-header__date">{formatDate(orderDate)}</p>
      {customer && (
        <p className="order-header__customer">Cliente: {customer}</p>
      )}
    </div>
    <OrderStatusBadge status={status} />
  </header>
);

export default OrderHeader;
