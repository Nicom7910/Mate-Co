import LinkButton from "../common/LinkButton.jsx";
import "./AuthButton.css";

const AuthButton = ({ token, onLogout }) =>
  token ? (
    <button
      type="button"
      className="btn btn--outline-green btn--small auth-button"
      onClick={onLogout}
    >
      Salir
    </button>
  ) : (
    <LinkButton to="/login" variant="outline-green" small>
      Ingresar
    </LinkButton>
  );

export default AuthButton;
