import { createSlice } from "@reduxjs/toolkit";
import uploadImage from "../api/uploadImage.js";
import toList from "../utils/toList.js";
import toProductBody from "../utils/toProductBody.js";
import createApiThunk from "./createApiThunk.js";
import addFetchCases from "./fetchCases.js";

export const fetchProducts = createApiThunk(
  "products/fetchProducts",
  (_, { send }) => send("/products").then(toList),
);

export const fetchProduct = createApiThunk(
  "products/fetchProduct",
  (id, { send }) => send(`/products/${id}`),
);

export const fetchProductsByCategory = createApiThunk(
  "products/fetchProductsByCategory",
  (categoryId, { send }) =>
    send(`/products/category/${categoryId}`).then(toList),
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

export const deactivateProduct = createApiThunk(
  "products/deactivateProduct",
  (id, { send }) =>
    send(`/products/${id}/status`, { method: "PATCH", body: { active: false } }),
);

const noProducts = [];

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: true,
    error: null,
    current: null,
    currentLoading: true,
    currentError: null,
    byCategory: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    addFetchCases(builder, fetchProducts);
    addFetchCases(builder, fetchProduct, {
      data: "current",
      loading: "currentLoading",
      error: "currentError",
      emptyValue: null,
    });
    builder
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.byCategory[action.meta.arg] = action.payload;
      })
      .addCase(deactivateProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(({ id }) => id !== action.meta.arg);
      });
  },
});

export const selectProducts = (state) => state.products.items;

export const selectProductsLoading = (state) => state.products.loading;

export const selectProductsError = (state) => state.products.error;

export const selectProduct = (id) => (state) =>
  state.products.current?.id === Number(id) ? state.products.current : null;

export const selectProductLoading = (state) => state.products.currentLoading;

export const selectProductError = (state) => state.products.currentError;

export const selectProductsByCategory = (categoryId) => (state) =>
  state.products.byCategory[categoryId] ?? noProducts;

export default productsSlice.reducer;
