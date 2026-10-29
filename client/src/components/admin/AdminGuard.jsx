import { useSelector } from "react-redux";
import { selectToken } from "../../redux/authSlice.js";
import {
  selectIsAdmin,
  selectUserLoading,
} from "../../redux/userSlice.js";
import CartNotice from "../cart/CartNotice.jsx";

const AdminGuard = ({ children }) => {
  const token = useSelector(selectToken);
  const loading = useSelector(selectUserLoading);
  const admin = useSelector(selectIsAdmin);

  if (!token) {
    return (
      <CartNotice
        text="Ingresá para acceder al panel de administración."
        to="/login"
        buttonText="Ingresar"
      />
    );
  }
  if (loading) return <p className="message">Verificando permisos...</p>;
  if (!admin) {
    return (
      <CartNotice
        text="No tenés permisos para ver esta sección."
        to="/"
        buttonText="Volver al inicio"
      />
    );
  }
  return children;
};

export default AdminGuard;
