import SectionToolbar from "../components/admin/SectionToolbar.jsx";
import ProductsList from "../components/admin/products/ProductsList.jsx";

const AdminProducts = ({ token }) => (
  <>
    <SectionToolbar
      title="Productos"
      to="/admin/products/new"
      buttonText="Nuevo producto"
    />
    <ProductsList token={token} />
  </>
);

export default AdminProducts;
