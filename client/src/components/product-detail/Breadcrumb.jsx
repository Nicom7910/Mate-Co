import { Link } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({ category, name }) => (
  <nav aria-label="Ruta" className="breadcrumb">
    <Link to="/products">Productos</Link>
    {category && (
      <>
        {" / "}
        <Link to={`/products?category=${category.id}`}>{category.name}</Link>
      </>
    )}
    {` / ${name}`}
  </nav>
);

export default Breadcrumb;
