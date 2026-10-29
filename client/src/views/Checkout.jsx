import CheckoutBody from "../components/checkout/CheckoutBody.jsx";
import CheckoutTitle from "../components/checkout/CheckoutTitle.jsx";

const Checkout = ({ cart, onCheckout }) => (
  <section className="container page">
    <CheckoutTitle />
    <CheckoutBody cart={cart} onCheckout={onCheckout} />
  </section>
);

export default Checkout;
