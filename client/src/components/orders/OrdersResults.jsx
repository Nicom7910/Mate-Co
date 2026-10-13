import { useState } from "react";
import paginate from "../../utils/paginate.js";
import Pagination from "../catalog/Pagination.jsx";
import OrderCard from "./OrderCard.jsx";
import "./OrdersList.css";

const PAGE_SIZE = 10;

const OrdersResults = ({ orders, admin }) => {
  const [page, setPage] = useState(1);
  const { items, totalPages, current } = paginate(orders, page, PAGE_SIZE);

  return (
    <>
      <ul className="orders-list">
        {items.map((order) => (
          <OrderCard key={order.id} order={order} showCustomer={admin} />
        ))}
      </ul>
      <Pagination page={current} totalPages={totalPages} onChange={setPage} />
    </>
  );
};

export default OrdersResults;
