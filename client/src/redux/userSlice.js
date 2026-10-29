import { createSlice } from "@reduxjs/toolkit";
import isAdmin from "../utils/isAdmin.js";
import { getToken } from "../utils/token.js";
import { login, logout, register } from "./authSlice.js";
import createApiThunk from "./createApiThunk.js";

export const fetchUser = createApiThunk("user/fetchUser", (_, { send }) =>
  send("/users/me"),
);

export const updateProfile = createApiThunk(
  "user/updateProfile",
  (values, { send }) => send("/users/me", { method: "PUT", body: values }),
);

const emptyState = { data: null, loading: false, error: null };

const startLoading = (state) => {
  state.loading = true;
};

const userSlice = createSlice({
  name: "user",
  initialState: { ...emptyState, loading: Boolean(getToken()) },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.loading = false;
        state.data = null;
        state.error = action.payload?.message ?? action.error.message;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(login.fulfilled, startLoading)
      .addCase(register.fulfilled, startLoading)
      .addCase(logout, () => emptyState);
  },
});

export const selectUser = (state) => state.user.data;

export const selectUserLoading = (state) => state.user.loading;

export const selectIsAdmin = (state) => isAdmin(state.user.data);

export default userSlice.reducer;
