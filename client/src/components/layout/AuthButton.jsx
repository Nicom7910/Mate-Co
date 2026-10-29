import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken } from "../../redux/authSlice.js";
import LinkButton from "../common/LinkButton.jsx";
import "./AuthButton.css";

const AuthButton = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  return token ? (
    <button
      type="button"
      className="btn btn--outline-green btn--small auth-button"
      onClick={() => dispatch(logout())}
    >
      Salir
    </button>
  ) : (
    <LinkButton to="/login" variant="outline-green" small>
      Ingresar
    </LinkButton>
  );
};

export default AuthButton;
