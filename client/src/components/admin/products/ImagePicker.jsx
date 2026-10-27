import ImagePickerInput from "./ImagePickerInput.jsx";
import ImagePickerList from "./ImagePickerList.jsx";
import "./ImagePicker.css";

// La foto es obligatoria: sin ninguna se muestra un aviso (gris al principio,
// rojo cuando ya hubo un intento o el servidor la rechazó).
const ImagePicker = ({ images, error }) => (
  <div className="image-picker auth-form__full">
    <span className="form-field__label">Fotos del producto</span>
    <ImagePickerList
      items={images.items}
      onRemove={images.remove}
      onMakeMain={images.makeMain}
    />
    <ImagePickerInput images={images} />
    {images.error && (
      <p className="form-field__error" role="alert">
        {images.error}
      </p>
    )}
    {error && (
      <p className="form-field__error" role="alert">
        {error}
      </p>
    )}
    {!error && images.items.length === 0 && (
      <p className="image-picker__hint">
        Es obligatoria al menos una foto para poder guardar.
      </p>
    )}
  </div>
);

export default ImagePicker;
