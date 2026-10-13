import CategoryRow from "./CategoryRow.jsx";
import "../AdminTable.css";

const CategoriesTable = ({
  categories,
  onDelete,
  onDeleted,
  onDeleteError,
}) => (
  <div className="admin-table-wrap">
    <table className="admin-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onDelete={onDelete}
            onDeleted={onDeleted}
            onDeleteError={onDeleteError}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default CategoriesTable;
