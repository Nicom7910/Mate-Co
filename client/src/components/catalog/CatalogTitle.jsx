import "./CatalogTitle.css";

const CatalogTitle = ({ count }) => (
  <>
    <h1 className="catalog-title">Productos</h1>
    <p className="catalog-title__count">
      {count !== null &&
        `Mostrando ${count} ${count === 1 ? "producto" : "productos"}`}
    </p>
  </>
);

export default CatalogTitle;
