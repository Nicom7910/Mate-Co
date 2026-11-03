import rowColumns from "../../utils/rowColumns.js";
import CategoryCard from "./CategoryCard.jsx";
import "./CategoryList.css";

const CategoryList = ({ categories }) => {
  if (categories.length === 0) {
    return <p className="message">Todavía no hay categorías.</p>;
  }

  const total = categories.length;
  const columns2 = rowColumns(total, 2);
  const columns3 = rowColumns(total, 3);
  const columns4 = rowColumns(total, 4);

  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <CategoryCard
          key={category.id}
          category={category}
          style={{
            "--cols-2": columns2[index],
            "--cols-3": columns3[index],
            "--cols-4": columns4[index],
          }}
        />
      ))}
    </div>
  );
};

export default CategoryList;
