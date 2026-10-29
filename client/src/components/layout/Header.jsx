import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectToken } from "../../redux/authSlice.js";
import { selectIsAdmin } from "../../redux/userSlice.js";
import AuthButton from "./AuthButton.jsx";
import CartLink from "./CartLink.jsx";
import HeaderNav from "./HeaderNav.jsx";
import MenuToggle from "./MenuToggle.jsx";
import "./Header.css";

const Header = ({ onLogout, cartCount }) => {
  const token = useSelector(selectToken);
  const isAdmin = useSelector(selectIsAdmin);
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
          <HeaderNav
            loggedIn={Boolean(token)}
            isAdmin={isAdmin}
            onNavigate={closeMenu}
          />
          <div className="header__auth" onClick={closeMenu}>
            <AuthButton token={token} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
