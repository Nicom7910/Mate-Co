import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/products", label: "Productos" },
  { to: "/orders", label: "Mis pedidos", adminLabel: "Pedidos", private: true },
  { to: "/profile", label: "Mi perfil", private: true },
];

const ADMIN_LINK = { to: "/admin", label: "Admin" };

const getLinkClass = ({ isActive }) =>
  isActive ? "header__link header__link--active" : "header__link";

const HeaderNav = ({ loggedIn, isAdmin, onNavigate }) => {
  const visibleLinks = NAV_LINKS.filter((link) => loggedIn || !link.private);

  return (
    <nav className="header__nav">
      {(isAdmin ? [...visibleLinks, ADMIN_LINK] : visibleLinks).map(
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
};

export default HeaderNav;
