import CategoryActions from "./CategoryActions.jsx";

const CategoryRow = ({ category, onDelete, onDeleted, onDeleteError }) => {
  const { id, name, description } = category;

  return (
    <tr>
      <td>{name}</td>
      <td>{description || "—"}</td>
      <td>
        <CategoryActions
          id={id}
          onDelete={onDelete}
          onDeleted={onDeleted}
          onDeleteError={(message) => onDeleteError(`${name}: ${message}`)}
        />
      </td>
    </tr>
  );
};

export default CategoryRow;
