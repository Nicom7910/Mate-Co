import FormHeader from "../components/admin/FormHeader.jsx";
import ProductEditor from "../components/admin/products/ProductEditor.jsx";

const AdminProductNew = ({ token }) => (
  <>
    <FormHeader
      title="Nuevo producto"
      backTo="/admin/products"
      backText="Volver a productos"
    />
    <ProductEditor token={token} />
  </>
);

export default AdminProductNew;
