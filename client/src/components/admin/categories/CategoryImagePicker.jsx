import ImagePickerControls from "../products/ImagePickerControls.jsx";
import "../products/ImagePicker.css";
import "./CategoryImagePicker.css";

const CategoryImagePicker = ({ image, error }) => (
  <div className="image-picker auth-form__full">
    <span className="form-field__label">Foto de la categoría</span>
    {image.preview && (
      <div className="category-image-preview">
        <img src={image.preview} alt="Vista previa de la foto" />
      </div>
    )}
    <ImagePickerControls image={image} />
    {image.error && (
      <p className="form-field__error" role="alert">
        {image.error}
      </p>
    )}
    {error && (
      <p className="form-field__error" role="alert">
        {error}
      </p>
    )}
    {!error && !image.preview && (
      <p className="image-picker__hint">
        La foto es obligatoria y es la que se ve en el inicio.
      </p>
    )}
  </div>
);

export default CategoryImagePicker;
