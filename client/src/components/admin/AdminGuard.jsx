import isAdmin from "../../utils/isAdmin.js";
import CartNotice from "../cart/CartNotice.jsx";

const AdminGuard = ({ token, user, loading, children }) => {
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
  if (!isAdmin(user)) {
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
