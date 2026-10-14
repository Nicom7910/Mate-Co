import formatPrice from "../../../utils/formatPrice.js";

const TopProductRow = ({ position, product }) => {
  const { productName, unitsSold, revenue } = product;

  return (
    <tr>
      <td className="admin-table__nowrap">{position}</td>
      <td>{productName}</td>
      <td className="admin-table__nowrap">{unitsSold}</td>
      <td className="admin-table__nowrap">{formatPrice(revenue)}</td>
    </tr>
  );
};

export default TopProductRow;
