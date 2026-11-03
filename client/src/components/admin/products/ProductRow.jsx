import formatPrice from "../../../utils/formatPrice.js";
import isProductActive from "../../../utils/isProductActive.js";
import AdminThumb from "../AdminThumb.jsx";
import ProductActions from "./ProductActions.jsx";

const ProductRow = ({ product, onDeleted, onDeleteError }) => {
  const { id, name, category, price, stock, discountPercentage, imageUrl } =
    product;
  const active = isProductActive(product);

  return (
    <tr className={active ? undefined : "admin-table__row--inactive"}>
      <td>
        <AdminThumb src={imageUrl} contain />
      </td>
      <td>
        {name}
        {!active && <span className="admin-table__tag">Eliminado</span>}
      </td>
      <td>{category?.name ?? "—"}</td>
      <td className="admin-table__nowrap">{formatPrice(price)}</td>
      <td>{stock}</td>
      <td>{discountPercentage ? `${discountPercentage}%` : "—"}</td>
      <td>
        <ProductActions
          id={id}
          active={active}
          onDeleted={onDeleted}
          onDeleteError={(message) => onDeleteError(`${name}: ${message}`)}
        />
      </td>
    </tr>
  );
};

export default ProductRow;
