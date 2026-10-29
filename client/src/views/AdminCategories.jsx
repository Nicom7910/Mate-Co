import SectionToolbar from "../components/admin/SectionToolbar.jsx";
import CategoriesList from "../components/admin/categories/CategoriesList.jsx";

const AdminCategories = () => (
  <>
    <SectionToolbar
      title="Categorías"
      to="/admin/categories/new"
      buttonText="Nueva categoría"
    />
    <CategoriesList />
  </>
);

export default AdminCategories;
