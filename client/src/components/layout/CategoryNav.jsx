import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { selectCategories } from "../../redux/categoriesSlice.js";
import "./CategoryNav.css";

const CategoryNav = () => {
  const categories = useSelector(selectCategories);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const barRef = useRef(null);

  const inCatalog = pathname === "/products";
  const selected = inCatalog ? (searchParams.get("category") ?? "") : null;

  useEffect(() => {
    const bar = barRef.current;
    const active = bar?.querySelector(".category-nav__link--active");
    if (!active) return;
    bar.scrollTo({
      left: active.offsetLeft - (bar.clientWidth - active.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [selected, categories.length]);

  if (categories.length === 0) return null;

  const getClass = (active) =>
    active ? "category-nav__link category-nav__link--active" : "category-nav__link";

  return (
    <nav className="category-nav" aria-label="Categorías">
      <div ref={barRef} className="container category-nav__inner">
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
