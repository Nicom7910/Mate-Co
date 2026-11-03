import { Link } from "react-router-dom";
import "./SectionTitle.css";

const SectionTitle = ({ title, linkTo, linkText, centered = false }) => (
  <div className={`section-title ${centered ? "section-title--centered" : ""}`}>
    <h2 className="section-title__text">{title}</h2>
    {linkTo && (
      <Link to={linkTo} className="section-title__link">
        {linkText}
      </Link>
    )}
  </div>
);

export default SectionTitle;
