import CartNotice from "../cart/CartNotice.jsx";
import SuggestedProducts from "../products/SuggestedProducts.jsx";

const OrdersEmpty = ({ admin }) =>
  admin ? (
    <p className="message">Todavía no hay pedidos confirmados.</p>
  ) : (
    <>
      <CartNotice
        text="Todavía no hiciste ninguna compra."
        to="/products"
        buttonText="Ver productos"
      />
      <SuggestedProducts />
    </>
  );

export default OrdersEmpty;
