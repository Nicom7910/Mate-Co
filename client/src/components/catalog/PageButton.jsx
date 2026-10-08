import "./PageButton.css";

const PageButton = ({ label, onClick, active = false, disabled = false }) => (
  <button
    type="button"
    className={`page-button ${active ? "page-button--active" : ""}`}
    onClick={onClick}
    disabled={disabled}
    aria-current={active ? "page" : undefined}
  >
    {label}
  </button>
);

export default PageButton;
