import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deactivateProduct } from "../../../redux/productsSlice.js";
import DeleteAction from "../DeleteAction.jsx";
import "../AdminActions.css";

const ProductActions = ({ id, onDeleted, onDeleteError }) => {
  const dispatch = useDispatch();

  return (
    <div className="admin-actions">
      <Link to={`/admin/products/${id}/edit`} className="admin-action">
        Editar
      </Link>
      <DeleteAction
        onDelete={() => dispatch(deactivateProduct(id)).unwrap()}
        onDeleted={onDeleted}
        onError={onDeleteError}
      />
    </div>
  );
};

export default ProductActions;
