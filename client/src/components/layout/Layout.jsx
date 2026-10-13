import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import "./Layout.css";

const Layout = ({ token, onLogout, cartCount }) => (
  <div className="layout">
    <Header token={token} onLogout={onLogout} cartCount={cartCount} />
    <main className="layout__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
