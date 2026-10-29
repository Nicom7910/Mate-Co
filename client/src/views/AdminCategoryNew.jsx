import FormHeader from "../components/admin/FormHeader.jsx";
import CategoryEditor from "../components/admin/categories/CategoryEditor.jsx";

const AdminCategoryNew = () => (
  <>
    <FormHeader
      title="Nueva categoría"
      backTo="/admin/categories"
      backText="Volver a categorías"
    />
    <CategoryEditor />
  </>
);

export default AdminCategoryNew;
