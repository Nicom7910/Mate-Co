import { Link } from "react-router-dom";
import "./FormHeader.css";

const FormHeader = ({ title, backTo, backText }) => (
  <header className="form-header">
    <Link to={backTo} className="form-header__back">
      ← {backText}
    </Link>
    <h2 className="form-header__title">{title}</h2>
  </header>
);

export default FormHeader;
