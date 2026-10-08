import { Link } from "react-router-dom";

const LinkButton = ({ to, variant = "primary", small = false, children }) => {
  const size = small ? " btn--small" : "";
  return (
    <Link to={to} className={`btn btn--${variant}${size}`}>
      {children}
    </Link>
  );
};

export default LinkButton;
