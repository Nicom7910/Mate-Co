import TopProductRow from "./TopProductRow.jsx";
import "../AdminTable.css";
import "./TopProducts.css";

const TopProducts = ({ products }) => (
  <section>
    <h3 className="top-products__title">Productos más vendidos</h3>
    {products.length === 0 ? (
      <p className="message">Todavía no hay ventas para armar el ranking.</p>
    ) : (
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Unidades</th>
              <th>Recaudado</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <TopProductRow
                key={product.productId}
                position={index + 1}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

export default TopProducts;
