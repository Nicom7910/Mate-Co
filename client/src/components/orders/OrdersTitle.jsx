import "./OrdersTitle.css";

const OrdersTitle = ({ admin }) => (
  <h1 className="orders-title">{admin ? "Pedidos" : "Mis pedidos"}</h1>
);

export default OrdersTitle;
