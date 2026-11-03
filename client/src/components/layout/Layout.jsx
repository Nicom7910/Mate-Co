import { Outlet } from "react-router-dom";
import useLoad from "../../hooks/useLoad.js";
import { fetchCategories } from "../../redux/categoriesSlice.js";
import Toasts from "../notifications/Toasts.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";
import "./Layout.css";

const Layout = () => {
  useLoad(fetchCategories);

  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
      <Toasts />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
