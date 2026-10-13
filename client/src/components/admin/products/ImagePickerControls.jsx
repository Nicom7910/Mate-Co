import "../AdminActions.css";

const ImagePickerControls = ({ image }) => (
  <div className="image-picker__controls">
    <input
      key={image.inputKey}
      type="file"
      accept="image/jpeg,image/png,image/webp,image/gif"
      aria-label="Elegir imagen"
      className="image-picker__input"
      onChange={(event) => image.select(event.target.files[0])}
    />
    <p className="image-picker__hint">JPG, PNG, WEBP o GIF de hasta 5 MB.</p>
    {image.preview && (
      <button type="button" className="admin-action" onClick={image.remove}>
        Quitar imagen
      </button>
    )}
  </div>
);

export default ImagePickerControls;
