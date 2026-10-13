import formatPrice from "../../utils/formatPrice.js";
import isCancellable from "../../utils/isCancellable.js";
import CancelOrderAction from "./CancelOrderAction.jsx";
import OrderHeader from "./OrderHeader.jsx";
import OrderLine from "./OrderLine.jsx";
import ShipOrderAction from "./ShipOrderAction.jsx";
import ShippingInfo from "./ShippingInfo.jsx";
import "./OrderCard.css";

const OrderCard = ({
  order,
  showCustomer = false,
  onCancel,
  onCancelled,
  onShip,
  onShipped,
}) => (
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
    <ShippingInfo status={order.status} shippedDate={order.shippedDate} />
    {onCancel && isCancellable(order.status, order.orderDate) && (
      <CancelOrderAction
        onCancel={() => onCancel(order.id)}
        onCancelled={onCancelled}
      />
    )}
    {onShip && order.status === "PAID" && (
      <ShipOrderAction onShip={() => onShip(order.id)} onShipped={onShipped} />
    )}
  </li>
);

export default OrderCard;
