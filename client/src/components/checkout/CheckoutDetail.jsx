import CheckoutForm from "./CheckoutForm.jsx";
import CheckoutSummary from "./CheckoutSummary.jsx";
import "./CheckoutDetail.css";

const CheckoutDetail = ({ cart, user, onCheckout, onPaid }) => (
  <div className="checkout">
    <CheckoutForm
      user={user}
      total={cart.total}
      onPay={onCheckout}
      onPaid={onPaid}
    />
    <CheckoutSummary items={cart.items} total={cart.total} />
  </div>
);

export default CheckoutDetail;
