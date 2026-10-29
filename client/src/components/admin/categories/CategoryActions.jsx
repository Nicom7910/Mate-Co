import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory } from "../../../redux/categoriesSlice.js";
import DeleteAction from "../DeleteAction.jsx";
import "../AdminActions.css";

const CategoryActions = ({ id, onDeleted, onDeleteError }) => {
  const dispatch = useDispatch();

  return (
    <div className="admin-actions">
      <Link to={`/admin/categories/${id}/edit`} className="admin-action">
        Editar
      </Link>
      <DeleteAction
        onDelete={() => dispatch(deleteCategory(id)).unwrap()}
        onDeleted={onDeleted}
        onError={onDeleteError}
      />
    </div>
  );
};

export default CategoryActions;
