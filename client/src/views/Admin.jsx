import { Outlet } from "react-router-dom";
import AdminGuard from "../components/admin/AdminGuard.jsx";
import AdminNav from "../components/admin/AdminNav.jsx";
import AdminTitle from "../components/admin/AdminTitle.jsx";

const Admin = ({ token, user, loading }) => (
  <section className="container page">
    <AdminTitle />
    <AdminGuard token={token} user={user} loading={loading}>
      <AdminNav />
      <Outlet />
    </AdminGuard>
  </section>
);

export default Admin;
