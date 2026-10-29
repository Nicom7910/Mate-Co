import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice.js";
import createApiThunk from "./createApiThunk.js";
import addFetchCases from "./fetchCases.js";

export const fetchStats = createApiThunk("stats/fetchStats", (_, { send }) =>
  send("/stats"),
);

const emptyState = { data: null, loading: true, error: null };

const statsSlice = createSlice({
  name: "stats",
  initialState: emptyState,
  reducers: {},
  extraReducers: (builder) => {
    addFetchCases(builder, fetchStats, { data: "data" });
    builder.addCase(logout, () => emptyState);
  },
});

export const selectStats = (state) => state.stats.data;

export const selectStatsLoading = (state) => state.stats.loading;

export const selectStatsError = (state) => state.stats.error;

export default statsSlice.reducer;
