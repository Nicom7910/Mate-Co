import ProductDetail from "../components/product-detail/ProductDetail.jsx";

const Product = ({ loggedIn, isAdmin, onAddToCart }) => (
  <section className="container page">
    <ProductDetail
      loggedIn={loggedIn}
      isAdmin={isAdmin}
      onAddToCart={onAddToCart}
    />
  </section>
);

export default Product;
