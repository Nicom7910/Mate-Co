import { useSelector } from "react-redux";
import CartBody from "../components/cart/CartBody.jsx";
import CartTitle from "../components/cart/CartTitle.jsx";
import SuggestedProducts from "../components/products/SuggestedProducts.jsx";
import { selectCart } from "../redux/cartSlice.js";

const Cart = () => {
  const cart = useSelector(selectCart);

  return (
    <section className="container page">
      <CartTitle />
      <CartBody />
      <SuggestedProducts
        excludeIds={cart?.items.map(({ productId }) => productId)}
      />
    </section>
  );
};

export default Cart;
