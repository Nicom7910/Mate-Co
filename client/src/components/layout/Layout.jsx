import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import "./Layout.css";

const Layout = () => (
  <div className="layout">
    <Header />
    <main className="layout__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
