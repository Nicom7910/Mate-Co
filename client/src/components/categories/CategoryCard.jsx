import { useState } from "react";
import { Link } from "react-router-dom";
import mate from "../../assets/mate.svg";
import "./CategoryCard.css";

const CategoryCard = ({ category, style }) => {
  const [failed, setFailed] = useState(false);
  const hasImage = category.imageUrl && !failed;

  return (
    <Link
      to={`/products?category=${category.id}`}
      className="category-card"
      style={style}
    >
      <div className="category-card__media">
        {hasImage ? (
          <img
            src={category.imageUrl}
            alt=""
            className="category-card__image"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <img
            src={mate}
            alt=""
            className="category-card__image category-card__image--placeholder"
          />
        )}
      </div>
      <div className="category-card__footer">
        <span className="category-card__name">{category.name}</span>
        <span className="category-card__arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
