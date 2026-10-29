import { configureStore } from "@reduxjs/toolkit";
import { removeToken, saveToken } from "../utils/token.js";
import authReducer, { selectToken } from "./authSlice.js";
import cartReducer from "./cartSlice.js";
import userReducer from "./userSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
  },
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
