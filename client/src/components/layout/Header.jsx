import { Link, NavLink } from "react-router-dom";
import CartLink from "./CartLink.jsx";
import LinkButton from "../common/LinkButton.jsx";
import "./Header.css";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/products", label: "Productos" },
  { to: "/orders", label: "Mis pedidos" },
];

const getLinkClass = ({ isActive }) =>
  isActive ? "header__link header__link--active" : "header__link";

const Header = () => (
  <header className="header">
    <div className="container header__inner">
      <Link to="/" className="header__logo">
        Mate&amp;Co
      </Link>
      <nav className="header__nav">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === "/"} className={getLinkClass}>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="header__actions">
        <CartLink />
        <LinkButton to="/login" variant="outline-green" small>
          Ingresar
        </LinkButton>
      </div>
    </div>
  </header>
);

export default Header;
