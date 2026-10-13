import { Link, NavLink } from "react-router-dom";
import CartLink from "./CartLink.jsx";
import AuthButton from "./AuthButton.jsx";
import "./Header.css";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/products", label: "Productos" },
  { to: "/orders", label: "Mis pedidos", adminLabel: "Pedidos" },
  { to: "/profile", label: "Mi perfil" },
];

const ADMIN_LINK = { to: "/admin", label: "Admin" };

const getLinkClass = ({ isActive }) =>
  isActive ? "header__link header__link--active" : "header__link";

const Header = ({ token, onLogout, cartCount, isAdmin }) => (
  <header className="header">
    <div className="container header__inner">
      <Link to="/" className="header__logo">
        Mate&amp;Co
      </Link>
      <nav className="header__nav">
        {(isAdmin ? [...NAV_LINKS, ADMIN_LINK] : NAV_LINKS).map(
          ({ to, label, adminLabel }) => (
            <NavLink key={to} to={to} end={to === "/"} className={getLinkClass}>
              {(isAdmin && adminLabel) || label}
            </NavLink>
          ),
        )}
      </nav>
      <div className="header__actions">
        {!isAdmin && <CartLink count={cartCount} />}
        <AuthButton token={token} onLogout={onLogout} />
      </div>
    </div>
  </header>
);

export default Header;
