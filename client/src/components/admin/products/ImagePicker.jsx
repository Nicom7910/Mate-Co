import ProductImage from "../../products/ProductImage.jsx";
import ImagePickerControls from "./ImagePickerControls.jsx";
import "./ImagePicker.css";

const ImagePicker = ({ image }) => (
  <div className="image-picker auth-form__full">
    <span className="form-field__label">Imagen del producto (opcional)</span>
    <div className="image-picker__body">
      <div className="image-picker__preview">
        <ProductImage
          key={image.preview}
          src={image.preview}
          alt="Vista previa de la imagen"
        />
      </div>
      <ImagePickerControls image={image} />
    </div>
    {image.error && (
      <p className="form-field__error" role="alert">
        {image.error}
      </p>
    )}
  </div>
);

export default ImagePicker;
