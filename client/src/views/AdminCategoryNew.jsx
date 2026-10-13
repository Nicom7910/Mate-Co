import FormHeader from "../components/admin/FormHeader.jsx";
import CategoryEditor from "../components/admin/categories/CategoryEditor.jsx";

const AdminCategoryNew = ({ token }) => (
  <>
    <FormHeader
      title="Nueva categoría"
      backTo="/admin/categories"
      backText="Volver a categorías"
    />
    <CategoryEditor token={token} />
  </>
);

export default AdminCategoryNew;
