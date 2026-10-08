import { Link } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ category }) => (
  <Link to={`/products?category=${category.id}`} className="category-card">
    {category.name}
    <span className="category-card__arrow" aria-hidden="true">
      →
    </span>
  </Link>
);

export default CategoryCard;
