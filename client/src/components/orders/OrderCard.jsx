import formatPrice from "../../utils/formatPrice.js";
import isCancellable from "../../utils/isCancellable.js";
import CancelOrderAction from "./CancelOrderAction.jsx";
import OrderHeader from "./OrderHeader.jsx";
import OrderLine from "./OrderLine.jsx";
import "./OrderCard.css";

const OrderCard = ({ order, showCustomer = false, onCancel, onCancelled }) => (
  <li className="order-card">
    <OrderHeader
      id={order.id}
      orderDate={order.orderDate}
      status={order.status}
      customer={showCustomer ? order.userName : null}
    />
    <ul className="order-card__lines">
      {order.items.map((item) => (
        <OrderLine key={item.productId} item={item} />
      ))}
    </ul>
    <p className="order-card__total">
      Total <strong>{formatPrice(order.total)}</strong>
    </p>
    {onCancel && isCancellable(order.status, order.orderDate) && (
      <CancelOrderAction
        onCancel={() => onCancel(order.id)}
        onCancelled={onCancelled}
      />
    )}
  </li>
);

export default OrderCard;
