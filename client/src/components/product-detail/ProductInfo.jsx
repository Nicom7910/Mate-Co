import PriceTag from "../products/PriceTag.jsx";
import PurchaseActions from "./PurchaseActions.jsx";
import StockBadge from "./StockBadge.jsx";
import "./ProductInfo.css";

const ProductInfo = ({ product, loggedIn, isAdmin, onAddToCart }) => {
  const { id, name, description, price, finalPrice, stock, category } = product;

  return (
    <div className="product-info">
      <span className="product-info__category">{category?.name}</span>
      <h1 className="product-info__name">{name}</h1>
      <PriceTag price={price} finalPrice={finalPrice} />
      <p className="product-info__description">{description}</p>
      <StockBadge stock={stock} />
      <div className="product-info__purchase">
        <PurchaseActions
          productId={id}
          stock={stock}
          loggedIn={loggedIn}
          isAdmin={isAdmin}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
