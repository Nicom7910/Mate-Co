import addBusinessDays from "./addBusinessDays.js";

export const DELIVERY_BUSINESS_DAYS = 3;

const deliveryEstimate = (shippedDate) =>
  addBusinessDays(new Date(shippedDate.slice(0, 19)), DELIVERY_BUSINESS_DAYS);

export default deliveryEstimate;
