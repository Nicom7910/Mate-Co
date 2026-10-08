import { Link } from "react-router-dom";
import "./SectionTitle.css";

const SectionTitle = ({ title, linkTo, linkText }) => (
  <div className="section-title">
    <h2 className="section-title__text">{title}</h2>
    {linkTo && (
      <Link to={linkTo} className="section-title__link">
        {linkText}
      </Link>
    )}
  </div>
);

export default SectionTitle;
