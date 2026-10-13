const confirmedOrders = (orders) =>
  orders
    .filter(({ status }) => status !== "PENDING")
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

export default confirmedOrders;
