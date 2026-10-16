import ProductImage from "../../products/ProductImage.jsx";
import "../AdminActions.css";

const ImagePickerItem = ({ item, isMain, onRemove, onMakeMain }) => (
  <li className="image-picker__item">
    <div className="image-picker__preview">
      <ProductImage
        key={item.preview}
        src={item.preview}
        alt="Vista previa de la foto"
      />
      {isMain && <span className="image-picker__badge">Principal</span>}
    </div>
    <div className="image-picker__actions">
      {!isMain && (
        <button
          type="button"
          className="admin-action"
          onClick={() => onMakeMain(item.key)}
        >
          Hacer principal
        </button>
      )}
      <button
        type="button"
        className="admin-action"
        onClick={() => onRemove(item.key)}
      >
        Quitar
      </button>
    </div>
  </li>
);

export default ImagePickerItem;
