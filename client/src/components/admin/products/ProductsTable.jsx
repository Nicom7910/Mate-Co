import ProductRow from "./ProductRow.jsx";
import "../AdminTable.css";

const ProductsTable = ({ products, onDelete, onDeleted, onDeleteError }) => (
  <div className="admin-table-wrap">
    <table className="admin-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Descuento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onDelete={onDelete}
            onDeleted={onDeleted}
            onDeleteError={onDeleteError}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductsTable;
