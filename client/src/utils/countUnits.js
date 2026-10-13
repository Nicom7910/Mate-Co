const countUnits = (cart) =>
  cart ? cart.items.reduce((total, { quantity }) => total + quantity, 0) : 0;

export default countUnits;
