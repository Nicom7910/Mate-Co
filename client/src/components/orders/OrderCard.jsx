import formatPrice from "../../utils/formatPrice.js";
import OrderHeader from "./OrderHeader.jsx";
import OrderLine from "./OrderLine.jsx";
import "./OrderCard.css";

const OrderCard = ({ order, showCustomer = false }) => (
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
  </li>
);

export default OrderCard;
