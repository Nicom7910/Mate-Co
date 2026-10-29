import { createSlice } from "@reduxjs/toolkit";
import toCategoryBody from "../utils/toCategoryBody.js";
import toList from "../utils/toList.js";
import createApiThunk from "./createApiThunk.js";
import addFetchCases from "./fetchCases.js";

export const fetchCategories = createApiThunk(
  "categories/fetchCategories",
  (_, { send }) => send("/categories").then(toList),
);

export const fetchCategory = createApiThunk(
  "categories/fetchCategory",
  (id, { send }) => send(`/categories/${id}`),
);

export const saveCategory = createApiThunk(
  "categories/saveCategory",
  ({ id, values }, { send }) =>
    send(id ? `/categories/${id}` : "/categories", {
      method: id ? "PUT" : "POST",
      body: toCategoryBody(values),
    }),
);

export const deleteCategory = createApiThunk(
  "categories/deleteCategory",
  (id, { send }) => send(`/categories/${id}`, { method: "DELETE" }),
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: true,
    error: null,
    current: null,
    currentLoading: true,
    currentError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    addFetchCases(builder, fetchCategories);
    addFetchCases(builder, fetchCategory, {
      data: "current",
      loading: "currentLoading",
      error: "currentError",
      emptyValue: null,
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.items = state.items.filter(({ id }) => id !== action.meta.arg);
    });
  },
});

export const selectCategories = (state) => state.categories.items;

export const selectCategoriesLoading = (state) => state.categories.loading;

export const selectCategoriesError = (state) => state.categories.error;

export const selectCategory = (id) => (state) =>
  state.categories.current?.id === Number(id) ? state.categories.current : null;

export const selectCategoryLoading = (state) => state.categories.currentLoading;

export const selectCategoryError = (state) => state.categories.currentError;

export default categoriesSlice.reducer;
