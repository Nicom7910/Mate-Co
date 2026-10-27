import CartBody from "../components/cart/CartBody.jsx";
import CartTitle from "../components/cart/CartTitle.jsx";
import SuggestedProducts from "../components/products/SuggestedProducts.jsx";

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
    <SuggestedProducts
      excludeIds={cart?.items.map(({ productId }) => productId)}
    />
  </section>
);

export default Cart;
