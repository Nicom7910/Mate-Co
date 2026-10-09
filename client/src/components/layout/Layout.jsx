import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import "./Layout.css";

const Layout = ({ token, onLogout }) => (
  <div className="layout">
    <Header token={token} onLogout={onLogout} />
    <main className="layout__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
