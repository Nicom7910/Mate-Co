import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice.js";
import createApiThunk from "./createApiThunk.js";
import addFetchCases from "./fetchCases.js";

export const fetchReviews = createApiThunk(
  "reviews/fetchReviews",
  (productId, { send }) => send(`/products/${productId}/reviews`),
);

export const fetchMyReviews = createApiThunk(
  "reviews/fetchMyReviews",
  (_, { send }) => send("/reviews/me"),
  {
    condition: (admin, { getState }) =>
      !admin && !getState().reviews.mineLoaded,
  },
);

export const createReview = createApiThunk(
  "reviews/createReview",
  ({ productId, rating, comment }, { send }) =>
    send(`/products/${productId}/reviews`, {
      method: "POST",
      body: { rating, comment },
    }),
);

const noReviews = [];

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    productId: null,
    items: [],
    loading: true,
    error: null,
    mine: [],
    mineLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    addFetchCases(builder, fetchReviews, {
      emptyValue: [],
      onPending: (state, action) => {
        state.productId = Number(action.meta.arg);
      },
    });
    builder
      .addCase(fetchMyReviews.fulfilled, (state, action) => {
        state.mine = action.payload;
        state.mineLoaded = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.mine.unshift(action.payload);
        if (state.productId === action.payload.productId)
          state.items.unshift(action.payload);
      })
      .addCase(logout, (state) => {
        state.mine = [];
        state.mineLoaded = false;
      });
  },
});

export const selectReviews = (productId) => (state) =>
  state.reviews.productId === Number(productId)
    ? state.reviews.items
    : noReviews;

export const selectReviewsLoading = (productId) => (state) =>
  state.reviews.productId !== Number(productId) || state.reviews.loading;

export const selectReviewsError = (productId) => (state) =>
  state.reviews.productId === Number(productId) ? state.reviews.error : null;

export const selectMyReview = (productId) => (state) =>
  state.reviews.mine.find((review) => review.productId === productId) ?? null;

export default reviewsSlice.reducer;
