import { createSlice } from "@reduxjs/toolkit";
import toList from "../utils/toList.js";
import { logout } from "./authSlice.js";
import createApiThunk from "./createApiThunk.js";
import addFetchCases from "./fetchCases.js";

export const fetchOrders = createApiThunk(
  "orders/fetchOrders",
  (admin, { send }) => send(admin ? "/orders" : "/orders/me").then(toList),
);

export const cancelOrder = createApiThunk(
  "orders/cancelOrder",
  (id, { send }) => send(`/orders/${id}/cancel`, { method: "PATCH" }),
);

export const shipOrder = createApiThunk(
  "orders/shipOrder",
  (id, { send }) => send(`/orders/${id}/ship`, { method: "PATCH" }),
);

const emptyState = { items: [], loading: true, error: null };

const replaceOrder = (state, action) => {
  state.items = state.items.map((order) =>
    order.id === action.payload.id ? action.payload : order,
  );
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: emptyState,
  reducers: {},
  extraReducers: (builder) => {
    addFetchCases(builder, fetchOrders);
    builder
      .addCase(cancelOrder.fulfilled, replaceOrder)
      .addCase(shipOrder.fulfilled, replaceOrder)
      .addCase(logout, () => emptyState);
  },
});

export const selectOrders = (state) => state.orders.items;

export const selectOrdersLoading = (state) => state.orders.loading;

export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
