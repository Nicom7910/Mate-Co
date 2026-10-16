import useCarousel from "../../hooks/useCarousel.js";
import GalleryStage from "./GalleryStage.jsx";
import GalleryThumbs from "./GalleryThumbs.jsx";
import "./ProductGallery.css";

const ProductGallery = ({ images, name, discountPercentage }) => {
  const { index, next, prev, goTo } = useCarousel(images.length);
  const hasMany = images.length > 1;

  return (
    <div className="product-gallery">
      <GalleryThumbs
        images={images}
        name={name}
        current={index}
        onSelect={goTo}
      />
      <GalleryStage
        src={images[index]}
        name={name}
        discountPercentage={discountPercentage}
        counter={hasMany ? `${index + 1} / ${images.length}` : null}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
};

export default ProductGallery;
