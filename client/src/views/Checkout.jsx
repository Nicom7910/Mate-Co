import CheckoutBody from "../components/checkout/CheckoutBody.jsx";
import CheckoutTitle from "../components/checkout/CheckoutTitle.jsx";

const Checkout = ({ loggedIn, user, loading, cart, onCheckout }) => (
  <section className="container page">
    <CheckoutTitle />
    <CheckoutBody
      loggedIn={loggedIn}
      user={user}
      loading={loading}
      cart={cart}
      onCheckout={onCheckout}
    />
  </section>
);

export default Checkout;
