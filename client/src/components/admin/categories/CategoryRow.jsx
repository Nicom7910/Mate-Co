import CategoryActions from "./CategoryActions.jsx";

const CategoryRow = ({ category, onDeleted, onDeleteError }) => {
  const { id, name, description, imageUrl } = category;

  return (
    <tr>
      <td>
        {imageUrl ? (
          <img src={imageUrl} alt="" className="admin-table__thumb" />
        ) : (
          <span className="admin-table__tag">Sin foto</span>
        )}
      </td>
      <td>{name}</td>
      <td>{description || "—"}</td>
      <td>
        <CategoryActions
          id={id}
          onDeleted={onDeleted}
          onDeleteError={(message) => onDeleteError(`${name}: ${message}`)}
        />
      </td>
    </tr>
  );
};

export default CategoryRow;
