import CategoryActions from "./CategoryActions.jsx";

const CategoryRow = ({ category, onDeleted, onDeleteError }) => {
  const { id, name, description } = category;

  return (
    <tr>
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
