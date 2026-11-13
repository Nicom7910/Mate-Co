import { configureStore } from "@reduxjs/toolkit";
import { removeToken, saveToken } from "../utils/token.js";
import authReducer, { logout, selectToken } from "./authSlice.js";
import cartReducer from "./cartSlice.js";
import categoriesReducer from "./categoriesSlice.js";
import notificationsReducer from "./notificationsSlice.js";
import ordersReducer from "./ordersSlice.js";
import productsReducer from "./productsSlice.js";
import reviewsReducer from "./reviewsSlice.js";
import statsReducer from "./statsSlice.js";
import userReducer from "./userSlice.js";

const logoutOnExpiredSession = (api) => (next) => (action) => {
  const result = next(action);
  const expired =
    action.type.endsWith("/rejected") &&
    action.payload?.status === 401 &&
    selectToken(api.getState());
  if (expired) api.dispatch(logout());
  return result;
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
    notifications: notificationsReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActionPaths: ["meta.arg.images"] },
    }).concat(logoutOnExpiredSession),
});

let currentToken = selectToken(store.getState());

store.subscribe(() => {
  const token = selectToken(store.getState());
  if (token === currentToken) return;
  currentToken = token;
  if (token) saveToken(token);
  else removeToken();
});

export default store;
