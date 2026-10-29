import { Outlet } from "react-router-dom";
import AdminGuard from "../components/admin/AdminGuard.jsx";
import AdminNav from "../components/admin/AdminNav.jsx";
import AdminTitle from "../components/admin/AdminTitle.jsx";

const Admin = () => (
  <section className="container page">
    <AdminTitle />
    <AdminGuard>
      <AdminNav />
      <Outlet />
    </AdminGuard>
  </section>
);

export default Admin;
