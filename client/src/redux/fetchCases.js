const addFetchCases = (
  builder,
  thunk,
  {
    data = "items",
    loading = "loading",
    error = "error",
    emptyValue,
    onPending,
    onFulfilled,
    onRejected,
  } = {},
) => {
  builder
    .addCase(thunk.pending, (state, action) => {
      if (loading) state[loading] = true;
      state[error] = null;
      if (emptyValue !== undefined) state[data] = emptyValue;
      onPending?.(state, action);
    })
    .addCase(thunk.fulfilled, (state, action) => {
      if (loading) state[loading] = false;
      state[data] = action.payload;
      onFulfilled?.(state, action);
    })
    .addCase(thunk.rejected, (state, action) => {
      if (action.meta.aborted) return;
      if (loading) state[loading] = false;
      state[error] = action.payload?.message ?? action.error.message;
      onRejected?.(state, action);
    });
};

export default addFetchCases;
