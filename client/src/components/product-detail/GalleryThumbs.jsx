import ProductImage from "../products/ProductImage.jsx";

const GalleryThumbs = ({ images, name, current, onSelect }) => {
  if (images.length < 2) return null;

  return (
    <ul className="gallery-thumbs">
      {images.map((src, index) => (
        <li key={`${index}-${src}`}>
          <button
            type="button"
            className={
              index === current
                ? "gallery-thumb gallery-thumb--active"
                : "gallery-thumb"
            }
            onClick={() => onSelect(index)}
            aria-label={`Ver foto ${index + 1}`}
            aria-current={index === current}
          >
            <ProductImage src={src} alt={`${name}, foto ${index + 1}`} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GalleryThumbs;
