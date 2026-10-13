import { useState } from "react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton.jsx";
import CartLink from "./CartLink.jsx";
import HeaderNav from "./HeaderNav.jsx";
import MenuToggle from "./MenuToggle.jsx";
import "./Header.css";

const Header = ({ token, onLogout, cartCount, isAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          Mate&amp;Co
        </Link>
        {!isAdmin && <CartLink count={cartCount} />}
        <MenuToggle open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        <div
          id="header-menu"
          className={`header__menu ${menuOpen ? "header__menu--open" : ""}`}
        >
          <HeaderNav isAdmin={isAdmin} onNavigate={closeMenu} />
          <div className="header__auth" onClick={closeMenu}>
            <AuthButton token={token} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
