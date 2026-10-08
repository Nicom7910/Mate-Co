import DiscountBadge from "../products/DiscountBadge.jsx";
import ProductImage from "../products/ProductImage.jsx";
import "./ProductGallery.css";

const ProductGallery = ({ imageUrl, name, discountPercentage }) => (
  <div className="product-gallery">
    <ProductImage src={imageUrl} alt={name} />
    {discountPercentage > 0 && (
      <DiscountBadge percentage={discountPercentage} />
    )}
  </div>
);

export default ProductGallery;
