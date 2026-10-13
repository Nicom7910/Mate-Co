import ProductDetail from "../components/product-detail/ProductDetail.jsx";

const Product = ({ loggedIn, onAddToCart }) => (
  <section className="container page">
    <ProductDetail loggedIn={loggedIn} onAddToCart={onAddToCart} />
  </section>
);

export default Product;
