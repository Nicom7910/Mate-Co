import useCategorySave from "../../../hooks/useCategorySave.js";
import CategoryForm from "./CategoryForm.jsx";
import "../products/ProductEditor.css";

const CategoryEditor = ({ token, category }) => {
  const { run, sending, error } = useCategorySave(token, category?.id);

  return (
    <div className="product-editor">
      <CategoryForm
        category={category}
        onSubmit={run}
        sending={sending}
        error={error}
      />
    </div>
  );
};

export default CategoryEditor;
