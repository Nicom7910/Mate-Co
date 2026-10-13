import "./OrderStatusBadge.css";

const STATUS_LABELS = {
  PAID: "Pagado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const OrderStatusBadge = ({ status }) => (
  <span className={`order-status order-status--${status.toLowerCase()}`}>
    {STATUS_LABELS[status] ?? status}
  </span>
);

export default OrderStatusBadge;
