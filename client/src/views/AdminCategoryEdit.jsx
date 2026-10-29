import FormHeader from "../components/admin/FormHeader.jsx";
import EditCategoryLoader from "../components/admin/categories/EditCategoryLoader.jsx";

const AdminCategoryEdit = () => (
  <>
    <FormHeader
      title="Editar categoría"
      backTo="/admin/categories"
      backText="Volver a categorías"
    />
    <EditCategoryLoader />
  </>
);

export default AdminCategoryEdit;
