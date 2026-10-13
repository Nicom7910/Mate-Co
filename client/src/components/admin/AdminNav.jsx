import { NavLink } from "react-router-dom";
import "./AdminNav.css";

const SECTIONS = [
  { to: "/admin/products", label: "Productos" },
  { to: "/admin/categories", label: "Categorías" },
];

const getTabClass = ({ isActive }) =>
  isActive ? "admin-nav__tab admin-nav__tab--active" : "admin-nav__tab";

const AdminNav = () => (
  <nav className="admin-nav">
    {SECTIONS.map(({ to, label }) => (
      <NavLink key={to} to={to} className={getTabClass}>
        {label}
      </NavLink>
    ))}
  </nav>
);

export default AdminNav;
