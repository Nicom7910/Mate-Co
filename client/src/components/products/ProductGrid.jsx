import ProductCard from "./ProductCard.jsx";
import "./ProductGrid.css";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return <p className="message">Todavía no hay productos.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
