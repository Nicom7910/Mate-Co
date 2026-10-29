import { createSlice } from "@reduxjs/toolkit";
import countUnits from "../utils/countUnits.js";
import { logout } from "./authSlice.js";
import createApiThunk from "./createApiThunk.js";

export const fetchCart = createApiThunk("cart/fetchCart", (_, { send }) =>
  send("/cart"),
);

export const addToCart = createApiThunk(
  "cart/addToCart",
  ({ productId, quantity }, { send }) =>
    send("/cart/items", { method: "POST", body: { productId, quantity } }),
);

export const changeQuantity = createApiThunk(
  "cart/changeQuantity",
  ({ productId, quantity }, { send }) =>
    send(`/cart/items/${productId}`, { method: "PUT", body: { quantity } }),
);

export const removeItem = createApiThunk(
  "cart/removeItem",
  (productId, { send }) =>
    send(`/cart/items/${productId}`, { method: "DELETE" }),
);

export const clearCart = createApiThunk("cart/clearCart", (_, { send }) =>
  send("/cart", { method: "DELETE" }),
);

export const checkout = createApiThunk("cart/checkout", (_, { send }) =>
  send("/cart", { method: "PATCH", body: { status: "PAID" } }),
);

const emptyState = { data: null, loading: false, error: null };

const saveCart = (state, action) => {
  state.data = action.payload;
};

const emptyCart = (state) => {
  state.data = null;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: emptyState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.loading = false;
        state.error = action.payload?.message ?? action.error.message;
      })
      .addCase(addToCart.fulfilled, saveCart)
      .addCase(changeQuantity.fulfilled, saveCart)
      .addCase(removeItem.fulfilled, saveCart)
      .addCase(clearCart.fulfilled, emptyCart)
      .addCase(checkout.fulfilled, emptyCart)
      .addCase(logout, () => emptyState);
  },
});

export const selectCart = (state) => state.cart.data;

export const selectCartLoading = (state) => state.cart.loading;

export const selectCartError = (state) => state.cart.error;

export const selectCartCount = (state) => countUnits(state.cart.data);

export default cartSlice.reducer;
