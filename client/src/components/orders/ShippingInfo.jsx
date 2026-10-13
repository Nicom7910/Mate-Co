import deliveryEstimate from "../../utils/deliveryEstimate.js";
import formatDate from "../../utils/formatDate.js";

const ShippingInfo = ({ status, shippedDate }) => {
  if (!shippedDate) return null;

  return (
    <p className="order-card__shipping">
      Enviado el {formatDate(shippedDate)}
      {status === "SHIPPED" &&
        ` · Entrega estimada: ${deliveryEstimate(
          shippedDate,
        ).toLocaleDateString("es-AR", { day: "numeric", month: "long" })}`}
    </p>
  );
};

export default ShippingInfo;
