import SectionTitle from "../common/SectionTitle.jsx";
import ProductGrid from "./ProductGrid.jsx";
import "./ProductSuggestions.css";

const ProductSuggestions = ({ title, products, linkTo, linkText }) => {
  if (products.length === 0) return null;

  return (
    <section className="product-suggestions">
      <SectionTitle title={title} linkTo={linkTo} linkText={linkText} />
      <ProductGrid products={products} />
    </section>
  );
};

export default ProductSuggestions;
