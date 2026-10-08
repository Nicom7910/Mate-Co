import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice.js";
import ProductImage from "./ProductImage.jsx";
import DiscountBadge from "./DiscountBadge.jsx";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    finalPrice,
    discountPercentage,
    imageUrl,
    category,
  } = product;
  const hasDiscount = discountPercentage > 0;

  return (
    <Link to={`/products/${id}`} className="product-card">
      <div className="product-card__image">
        <ProductImage src={imageUrl} alt={name} />
        {hasDiscount && <DiscountBadge percentage={discountPercentage} />}
      </div>
      <div className="product-card__info">
        <span className="product-card__category">{category?.name}</span>
        <h3 className="product-card__name">{name}</h3>
        <div className="product-card__prices">
          <span className="product-card__price">
            {formatPrice(finalPrice ?? price)}
          </span>
          {hasDiscount && (
            <span className="product-card__old-price">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
