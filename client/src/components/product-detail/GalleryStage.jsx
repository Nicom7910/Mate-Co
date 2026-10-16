import DiscountBadge from "../products/DiscountBadge.jsx";
import ProductImage from "../products/ProductImage.jsx";
import GalleryArrow from "./GalleryArrow.jsx";

const GalleryStage = ({
  src,
  name,
  discountPercentage,
  counter,
  onPrev,
  onNext,
}) => (
  <div className="gallery-stage">
    <ProductImage key={src} src={src} alt={name} />
    {discountPercentage > 0 && (
      <DiscountBadge percentage={discountPercentage} />
    )}
    {counter && (
      <>
        <GalleryArrow direction="prev" onClick={onPrev} />
        <GalleryArrow direction="next" onClick={onNext} />
        <span className="gallery-stage__counter">{counter}</span>
      </>
    )}
  </div>
);

export default GalleryStage;
