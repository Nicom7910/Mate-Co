import balancedColumns from "../../utils/balancedColumns.js";
import CategoryCard from "./CategoryCard.jsx";
import "./CategoryList.css";

const CategoryList = ({ categories }) => {
  if (categories.length === 0) {
    return <p className="message">Todavía no hay categorías.</p>;
  }

  const columns = {
    "--cols-2": balancedColumns(categories.length, 2),
    "--cols-3": balancedColumns(categories.length, 3),
    "--cols-4": balancedColumns(categories.length, 4),
  };

  return (
    <div className="category-list" style={columns}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
