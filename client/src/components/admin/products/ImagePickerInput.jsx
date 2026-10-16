import { MAX_IMAGES } from "../../../utils/imageItems.js";

const ImagePickerInput = ({ images }) => (
  <div className="image-picker__controls">
    {images.canAddMore && (
      <input
        key={images.inputKey}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        aria-label="Agregar fotos"
        className="image-picker__input"
        onChange={(event) => images.add(Array.from(event.target.files))}
      />
    )}
    <p className="image-picker__hint">
      JPG, PNG, WEBP o GIF de hasta 5 MB. Hasta {MAX_IMAGES} fotos; la primera
      es la principal.
    </p>
  </div>
);

export default ImagePickerInput;
