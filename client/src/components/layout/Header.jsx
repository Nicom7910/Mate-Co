import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectToken } from "../../redux/authSlice.js";
import { selectCartCount } from "../../redux/cartSlice.js";
import { selectIsAdmin } from "../../redux/userSlice.js";
import AuthButton from "./AuthButton.jsx";
import CartLink from "./CartLink.jsx";
import CategoryNav from "./CategoryNav.jsx";
import HeaderNav from "./HeaderNav.jsx";
import HeaderSearch from "./HeaderSearch.jsx";
import MenuToggle from "./MenuToggle.jsx";
import TopBar from "./TopBar.jsx";
import "./Header.css";

const Header = () => {
  const token = useSelector(selectToken);
  const isAdmin = useSelector(selectIsAdmin);
  const cartCount = useSelector(selectCartCount);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <TopBar />
      <div className="header__main">
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
            <HeaderSearch onSearch={closeMenu} />
            <div className="header__auth" onClick={closeMenu}>
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
      <CategoryNav />
    </header>
  );
};

export default Header;
