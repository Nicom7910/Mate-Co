import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setProductActive } from "../../../redux/productsSlice.js";
import DeleteAction from "../DeleteAction.jsx";
import RestoreAction from "./RestoreAction.jsx";
import "../AdminActions.css";

const ProductActions = ({ id, active, onDeleted, onDeleteError }) => {
  const dispatch = useDispatch();
  const changeActive = (value) =>
    dispatch(setProductActive({ id, active: value })).unwrap();

  return (
    <div className="admin-actions">
      <Link to={`/admin/products/${id}/edit`} className="admin-action">
        Editar
      </Link>
      {active ? (
        <DeleteAction
          onDelete={() => changeActive(false)}
          onDeleted={onDeleted}
          onError={onDeleteError}
        />
      ) : (
        <RestoreAction
          onRestore={() => changeActive(true)}
          onRestored={onDeleted}
          onError={onDeleteError}
        />
      )}
    </div>
  );
};

export default ProductActions;
