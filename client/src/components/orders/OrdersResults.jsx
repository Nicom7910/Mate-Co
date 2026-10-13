import { useState } from "react";
import usePageChange from "../../hooks/usePageChange.js";
import paginate from "../../utils/paginate.js";
import Pagination from "../catalog/Pagination.jsx";
import OrderCard from "./OrderCard.jsx";
import "./OrdersList.css";

const PAGE_SIZE = 10;

const OrdersResults = ({ orders, admin, onCancel, onCancelled }) => {
  const [page, setPage] = useState(1);
  const { items, totalPages, current } = paginate(orders, page, PAGE_SIZE);
  const { targetRef, changePage } = usePageChange(setPage);

  return (
    <>
      <ul ref={targetRef} className="orders-list scroll-target">
        {items.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            showCustomer={admin}
            onCancel={onCancel}
            onCancelled={onCancelled}
          />
        ))}
      </ul>
      <Pagination
        page={current}
        totalPages={totalPages}
        onChange={changePage}
      />
    </>
  );
};

export default OrdersResults;
