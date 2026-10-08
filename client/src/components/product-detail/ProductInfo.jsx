import PriceTag from "../products/PriceTag.jsx";
import PurchaseActions from "./PurchaseActions.jsx";
import StockBadge from "./StockBadge.jsx";
import "./ProductInfo.css";

const ProductInfo = ({ product }) => {
  const { name, description, price, finalPrice, stock, category } = product;

  return (
    <div className="product-info">
      <span className="product-info__category">{category?.name}</span>
      <h1 className="product-info__name">{name}</h1>
      <PriceTag price={price} finalPrice={finalPrice} />
      <p className="product-info__description">{description}</p>
      <StockBadge stock={stock} />
      <div className="product-info__purchase">
        <PurchaseActions stock={stock} />
      </div>
    </div>
  );
};

export default ProductInfo;
