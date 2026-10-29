const addFetchCases = (
  builder,
  thunk,
  { data = "items", loading = "loading", error = "error", emptyValue } = {},
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state[loading] = true;
      state[error] = null;
      if (emptyValue !== undefined) state[data] = emptyValue;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state[loading] = false;
      state[data] = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      if (action.meta.aborted) return;
      state[loading] = false;
      state[error] = action.payload?.message ?? action.error.message;
    });
};

export default addFetchCases;
