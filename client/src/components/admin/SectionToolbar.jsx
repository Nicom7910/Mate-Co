import LinkButton from "../common/LinkButton.jsx";
import "./SectionToolbar.css";

const SectionToolbar = ({ title, to, buttonText }) => (
  <div className="section-toolbar">
    <h2 className="section-toolbar__title">{title}</h2>
    <LinkButton to={to} small>
      {buttonText}
    </LinkButton>
  </div>
);

export default SectionToolbar;
