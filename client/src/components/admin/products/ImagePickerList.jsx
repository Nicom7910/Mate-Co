import ImagePickerItem from "./ImagePickerItem.jsx";

const ImagePickerList = ({ items, onRemove, onMakeMain }) => {
  if (items.length === 0) return null;

  return (
    <ul className="image-picker__list">
      {items.map((item, index) => (
        <ImagePickerItem
          key={item.key}
          item={item}
          isMain={index === 0}
          onRemove={onRemove}
          onMakeMain={onMakeMain}
        />
      ))}
    </ul>
  );
};

export default ImagePickerList;
