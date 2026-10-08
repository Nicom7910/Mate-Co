import { useState } from "react";
import mate from "../../assets/mate.svg";
import "./ProductImage.css";

const ProductImage = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  return (
    <img
      src={showPlaceholder ? mate : src}
      alt={alt}
      className={
        showPlaceholder
          ? "product-image product-image--placeholder"
          : "product-image"
      }
      onError={() => setFailed(true)}
    />
  );
};

export default ProductImage;
