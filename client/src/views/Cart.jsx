import CartBody from "../components/cart/CartBody.jsx";
import CartTitle from "../components/cart/CartTitle.jsx";

const Cart = ({ loggedIn, cart, onChangeQuantity, onRemove, onClear }) => (
  <section className="container page">
    <CartTitle />
    <CartBody
      loggedIn={loggedIn}
      cart={cart}
      onChangeQuantity={onChangeQuantity}
      onRemove={onRemove}
      onClear={onClear}
    />
  </section>
);

export default Cart;
