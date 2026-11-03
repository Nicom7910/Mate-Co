import { useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import useLoad from "../../hooks/useLoad.js";
import {
  fetchCategories,
  selectCategories,
} from "../../redux/categoriesSlice.js";
import "./CategoryNav.css";

const CategoryNav = () => {
  useLoad(fetchCategories);
  const categories = useSelector(selectCategories);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  if (categories.length === 0) return null;

  const inCatalog = pathname === "/products";
  const selected = inCatalog ? (searchParams.get("category") ?? "") : null;
  const getClass = (active) =>
    active ? "category-nav__link category-nav__link--active" : "category-nav__link";

  return (
    <nav className="category-nav" aria-label="Categorías">
      <div className="container category-nav__inner">
        <Link to="/products" className={getClass(selected === "")}>
          Todo
        </Link>
        {categories.map(({ id, name }) => (
          <Link
            key={id}
            to={`/products?category=${id}`}
            className={getClass(selected === String(id))}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default CategoryNav;
