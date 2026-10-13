import FormHeader from "../components/admin/FormHeader.jsx";
import EditCategoryLoader from "../components/admin/categories/EditCategoryLoader.jsx";

const AdminCategoryEdit = ({ token }) => (
  <>
    <FormHeader
      title="Editar categoría"
      backTo="/admin/categories"
      backText="Volver a categorías"
    />
    <EditCategoryLoader token={token} />
  </>
);

export default AdminCategoryEdit;
