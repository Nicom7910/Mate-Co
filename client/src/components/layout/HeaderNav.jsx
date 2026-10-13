import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/products", label: "Productos" },
  { to: "/orders", label: "Mis pedidos", adminLabel: "Pedidos" },
  { to: "/profile", label: "Mi perfil" },
];

const ADMIN_LINK = { to: "/admin", label: "Admin" };

const getLinkClass = ({ isActive }) =>
  isActive ? "header__link header__link--active" : "header__link";

const HeaderNav = ({ isAdmin, onNavigate }) => (
  <nav className="header__nav">
    {(isAdmin ? [...NAV_LINKS, ADMIN_LINK] : NAV_LINKS).map(
      ({ to, label, adminLabel }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={getLinkClass}
          onClick={onNavigate}
        >
          {(isAdmin && adminLabel) || label}
        </NavLink>
      ),
    )}
  </nav>
);

export default HeaderNav;
