import { Link } from "react-router-dom";
import "./AuthSwitch.css";

const AuthSwitch = ({ text, linkText, to }) => (
  <p className="auth-switch">
    {text} <Link to={to}>{linkText}</Link>
  </p>
);

export default AuthSwitch;
