import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api/request.js";

const createApiThunk = (type, handler) =>
  createAsyncThunk(type, async (arg, { getState, dispatch, signal, rejectWithValue }) => {
    const send = (path, options) =>
      request(path, { ...options, token: getState().auth.token, signal });

    try {
      return await handler(arg, { send, dispatch, getState });
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        fields: error.fields ?? null,
      });
    }
  });

export default createApiThunk;
