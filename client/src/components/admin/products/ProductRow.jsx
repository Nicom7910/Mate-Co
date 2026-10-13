import formatPrice from "../../../utils/formatPrice.js";
import ProductActions from "./ProductActions.jsx";

const ProductRow = ({ product, onDelete, onDeleted, onDeleteError }) => {
  const { id, name, category, price, stock, discountPercentage } = product;

  return (
    <tr>
      <td>{name}</td>
      <td>{category?.name ?? "—"}</td>
      <td className="admin-table__nowrap">{formatPrice(price)}</td>
      <td>{stock}</td>
      <td>{discountPercentage ? `${discountPercentage}%` : "—"}</td>
      <td>
        <ProductActions
          id={id}
          onDelete={onDelete}
          onDeleted={onDeleted}
          onDeleteError={(message) => onDeleteError(`${name}: ${message}`)}
        />
      </td>
    </tr>
  );
};

export default ProductRow;
