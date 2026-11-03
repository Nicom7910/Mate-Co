import axios from "axios";
import { API_URL } from "./config.js";

const client = axios.create({ baseURL: API_URL });

const request = (path, { method = "GET", body, token, signal } = {}) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return client
    .request({ url: path, method, data: body, headers, signal })
    .then((response) => (response.data === "" ? null : response.data))
    .catch((error) => {
      if (axios.isCancel(error)) throw error;
      const data = error.response?.data;
      const fallback = error.response
        ? `Error ${error.response.status}`
        : "No pudimos conectar con el servidor.";
      const failure = new Error(data?.message ?? fallback);
      failure.fields = data?.errors ?? null;
      failure.status = error.response?.status ?? null;
      throw failure;
    });
};

export default request;
