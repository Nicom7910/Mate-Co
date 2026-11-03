import { createSelector, createSlice } from "@reduxjs/toolkit";
import uploadImage from "../api/uploadImage.js";
import isProductActive from "../utils/isProductActive.js";
import toList from "../utils/toList.js";
import toProductBody from "../utils/toProductBody.js";
import { logout } from "./authSlice.js";
import { checkout } from "./cartSlice.js";
import { saveCategory } from "./categoriesSlice.js";
import createApiThunk from "./createApiThunk.js";
import addFetchCases from "./fetchCases.js";
import { cancelOrder } from "./ordersSlice.js";

const isLoaded = ({ scope }, includeInactive) =>
  scope === "all" || (!includeInactive && scope === "public");

const findProduct = ({ current, items, scope }, id) => {
  if (current?.id === Number(id)) return current;
  if (!scope) return null;
  return items.find((product) => product.id === Number(id)) ?? null;
};

export const fetchProducts = createApiThunk(
  "products/fetchProducts",
  (includeInactive, { send }) =>
    send(includeInactive ? "/products?includeInactive=true" : "/products").then(
      toList,
    ),
  {
    condition: (includeInactive, { getState }) =>
      !isLoaded(getState().products, includeInactive),
  },
);

export const fetchProduct = createApiThunk(
  "products/fetchProduct",
  (id, { send }) => send(`/products/${id}`),
  {
    condition: (id, { getState }) => !findProduct(getState().products, id),
  },
);

export const saveProduct = createApiThunk(
  "products/saveProduct",
  async ({ id, values, images }, { send }) => {
    const imageUrls = await Promise.all(
      images.map(({ url, file }) => (file ? uploadImage(file, send) : url)),
    );

    return send(id ? `/products/${id}` : "/products", {
      method: id ? "PUT" : "POST",
      body: toProductBody({ ...values, imageUrls }),
    });
  },
);

export const setProductActive = createApiThunk(
  "products/setProductActive",
  ({ id, active }, { send }) =>
    send(`/products/${id}/status`, { method: "PATCH", body: { active } }),
);

const upsert = (items, product) => {
  const index = items.findIndex(({ id }) => id === product.id);
  if (index === -1) items.push(product);
  else items[index] = product;
};

const keepProduct = (state, action) => {
  const product = action.payload;
  if (state.scope) upsert(state.items, product);
  if (state.current?.id === product.id) state.current = product;
};

const refreshCategory = (state, action) => {
  const category = action.payload;
  [...state.items, state.current].forEach((product) => {
    if (product?.category?.id === category.id) product.category = category;
  });
};

const invalidate = (state) => {
  state.scope = null;
  state.current = null;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    scope: null,
    loading: true,
    error: null,
    current: null,
    currentError: null,
    notFoundId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    addFetchCases(builder, fetchProducts, {
      onFulfilled: (state, action) => {
        state.scope = action.meta.arg ? "all" : "public";
      },
    });
    addFetchCases(builder, fetchProduct, {
      data: "current",
      loading: null,
      error: "currentError",
      emptyValue: null,
      onPending: (state) => {
        state.notFoundId = null;
      },
      onRejected: (state, action) => {
        if (action.payload?.status === 404)
          state.notFoundId = Number(action.meta.arg);
      },
    });
    builder
      .addCase(saveProduct.fulfilled, keepProduct)
      .addCase(setProductActive.fulfilled, keepProduct)
      .addCase(saveCategory.fulfilled, refreshCategory)
      .addCase(checkout.fulfilled, invalidate)
      .addCase(cancelOrder.fulfilled, invalidate)
      .addCase(logout, (state) => {
        state.items = state.items.filter(isProductActive);
        if (state.scope === "all") state.scope = "public";
        if (state.current && !isProductActive(state.current))
          state.current = null;
      });
  },
});

const selectAllProducts = (state) => state.products.items;

const selectProducts = createSelector([selectAllProducts], (items) =>
  items.filter(isProductActive),
);

const selectProductsLoading = (state) => state.products.loading;

const selectProductsError = (state) => state.products.error;

const selectProduct = (id) => (state) => findProduct(state.products, id);

const selectProductLoading = (id) => (state) =>
  !findProduct(state.products, id) && !state.products.currentError;

const selectProductError = (id) => (state) =>
  findProduct(state.products, id) ? null : state.products.currentError;

const selectProductNotFound = (id) => (state) =>
  state.products.notFoundId === Number(id) &&
  !findProduct(state.products, id);

export {
  selectAllProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectProduct,
  selectProductLoading,
  selectProductError,
  selectProductNotFound,
};

export default productsSlice.reducer;
