import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../utils/token.js";
import createApiThunk from "./createApiThunk.js";

export const login = createApiThunk("auth/login", (values, { send }) =>
  send("/api/v1/auth/authenticate", { method: "POST", body: values }),
);

export const register = createApiThunk("auth/register", (values, { send }) =>
  send("/api/v1/auth/register", { method: "POST", body: values }),
);

const saveSession = (state, action) => {
  state.token = action.payload.access_token;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { token: getToken() },
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, saveSession);
    builder.addCase(register.fulfilled, saveSession);
  },
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
