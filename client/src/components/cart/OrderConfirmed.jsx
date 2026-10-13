import formatPrice from "../../utils/formatPrice.js";
import LinkButton from "../common/LinkButton.jsx";
import "./OrderConfirmed.css";

const OrderConfirmed = ({ order }) => (
  <div className="order-confirmed">
    <h2 className="order-confirmed__title">¡Compra confirmada!</h2>
    <p className="order-confirmed__text">
      Tu pedido #{order.id} por {formatPrice(order.total)} quedó registrado.
      Gracias por elegir Mate&amp;Co.
    </p>
    <div className="order-confirmed__actions">
      <LinkButton to="/orders">Ver mis pedidos</LinkButton>
      <LinkButton to="/products" variant="outline">
        Seguir comprando
      </LinkButton>
    </div>
  </div>
);

export default OrderConfirmed;
