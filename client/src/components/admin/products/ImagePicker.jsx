import ImagePickerInput from "./ImagePickerInput.jsx";
import ImagePickerList from "./ImagePickerList.jsx";
import "./ImagePicker.css";

const ImagePicker = ({ images }) => (
  <div className="image-picker auth-form__full">
    <span className="form-field__label">Fotos del producto (opcional)</span>
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
  </div>
);

export default ImagePicker;
