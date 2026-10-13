import "./MenuToggle.css";

const MenuToggle = ({ open, onClick }) => (
  <button
    type="button"
    className="menu-toggle"
    onClick={onClick}
    aria-expanded={open}
    aria-controls="header-menu"
    aria-label={open ? "Cerrar menú" : "Abrir menú"}
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  </button>
);

export default MenuToggle;
