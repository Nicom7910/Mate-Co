import { Link } from "react-router-dom";
import DeleteAction from "../DeleteAction.jsx";
import "../AdminActions.css";

const CategoryActions = ({ id, onDelete, onDeleted, onDeleteError }) => (
  <div className="admin-actions">
    <Link to={`/admin/categories/${id}/edit`} className="admin-action">
      Editar
    </Link>
    <DeleteAction
      onDelete={() => onDelete(id)}
      onDeleted={onDeleted}
      onError={onDeleteError}
    />
  </div>
);

export default CategoryActions;
