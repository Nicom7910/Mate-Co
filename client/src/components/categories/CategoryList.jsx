import CategoryCard from "./CategoryCard.jsx";
import "./CategoryList.css";

const CategoryList = ({ categories }) => {
  if (categories.length === 0) {
    return <p className="message">Todavía no hay categorías.</p>;
  }

  return (
    <div className="category-list">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
