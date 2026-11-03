import { createSlice } from "@reduxjs/toolkit";
import toCategoryBody from "../utils/toCategoryBody.js";
import toList from "../utils/toList.js";
import createApiThunk from "./createApiThunk.js";
import addFetchCases from "./fetchCases.js";

const findCategory = ({ current, items, loaded }, id) => {
  if (current?.id === Number(id)) return current;
  if (!loaded) return null;
  return items.find((category) => category.id === Number(id)) ?? null;
};

export const fetchCategories = createApiThunk(
  "categories/fetchCategories",
  (_, { send }) => send("/categories").then(toList),
  { condition: (_, { getState }) => !getState().categories.loaded },
);

export const fetchCategory = createApiThunk(
  "categories/fetchCategory",
  (id, { send }) => send(`/categories/${id}`),
  {
    condition: (id, { getState }) => !findCategory(getState().categories, id),
  },
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
    loaded: false,
    loading: true,
    error: null,
    current: null,
    currentError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    addFetchCases(builder, fetchCategories, {
      onFulfilled: (state) => {
        state.loaded = true;
      },
    });
    addFetchCases(builder, fetchCategory, {
      data: "current",
      loading: null,
      error: "currentError",
      emptyValue: null,
    });
    builder
      .addCase(saveCategory.fulfilled, (state, action) => {
        const category = action.payload;
        if (state.loaded) {
          const index = state.items.findIndex(({ id }) => id === category.id);
          if (index === -1) state.items.push(category);
          else state.items[index] = category;
        }
        if (state.current?.id === category.id) state.current = category;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(({ id }) => id !== action.meta.arg);
        if (state.current?.id === action.meta.arg) state.current = null;
      });
  },
});

export const selectCategories = (state) => state.categories.items;

export const selectCategoriesLoading = (state) => state.categories.loading;

export const selectCategoriesError = (state) => state.categories.error;

export const selectCategory = (id) => (state) =>
  findCategory(state.categories, id);

export const selectCategoryLoading = (id) => (state) =>
  !findCategory(state.categories, id) && !state.categories.currentError;

export const selectCategoryError = (id) => (state) =>
  findCategory(state.categories, id) ? null : state.categories.currentError;

export default categoriesSlice.reducer;
