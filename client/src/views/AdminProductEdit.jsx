import FormHeader from "../components/admin/FormHeader.jsx";
import EditProductLoader from "../components/admin/products/EditProductLoader.jsx";

const AdminProductEdit = ({ token }) => (
  <>
    <FormHeader
      title="Editar producto"
      backTo="/admin/products"
      backText="Volver a productos"
    />
    <EditProductLoader token={token} />
  </>
);

export default AdminProductEdit;
