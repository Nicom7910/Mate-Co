import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAction from "../../hooks/useAction.js";
import { selectToken } from "../../redux/authSlice.js";
import { addToCart } from "../../redux/cartSlice.js";
import { selectIsAdmin } from "../../redux/userSlice.js";
import AddToCartMessage from "../product-detail/AddToCartMessage.jsx";
import "./ProductQuickAdd.css";

const ProductQuickAdd = ({ productId, stock }) => {
  const dispatch = useDispatch();
  const loggedIn = Boolean(useSelector(selectToken));
  const isAdmin = useSelector(selectIsAdmin);
  const { run, sending, error } = useAction((id) =>
    dispatch(addToCart({ productId: id, quantity: 1 })).unwrap(),
  );

  if (isAdmin) return null;

  return (
    <div className="quick-add">
      {loggedIn ? (
        <button
          type="button"
          className="btn btn--primary btn--small quick-add__button"
          disabled={stock === 0 || sending}
          onClick={() => run(productId)}
        >
          {stock === 0
            ? "Sin stock"
            : sending
              ? "Agregando..."
              : "Agregar al carrito"}
        </button>
      ) : (
        <Link
          to="/login"
          className="btn btn--outline-green btn--small quick-add__button"
        >
          Ingresá para comprar
        </Link>
      )}
      <AddToCartMessage error={error} />
    </div>
  );
};

export default ProductQuickAdd;
