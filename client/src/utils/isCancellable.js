import addBusinessDays from "./addBusinessDays.js";

const CANCEL_BUSINESS_DAYS = 15;

const isCancellable = (status, orderDate) => {
  if (status !== "PAID" || !orderDate) return false;

  const lastDay = addBusinessDays(new Date(orderDate), CANCEL_BUSINESS_DAYS);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today <= lastDay;
};

export default isCancellable;
