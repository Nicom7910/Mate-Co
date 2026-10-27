import { API_URL } from "./config.js";

const readBody = (response) =>
  response.status === 204
    ? Promise.resolve(null)
    : response.json().catch(() => null);

const request = (path, { method = "GET", body, token, signal } = {}) => {
  const headers = {};
  const isFile = body instanceof FormData;
  if (body && !isFile) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body && !isFile ? JSON.stringify(body) : body,
    signal,
  }).then((response) =>
    readBody(response).then((data) => {
      if (!response.ok) {
        const error = new Error(data?.message ?? `Error ${response.status}`);
        // Errores por campo que manda el backend: { email: "Ya existe...", ... }
        error.fields = data?.errors ?? null;
        throw error;
      }
      return data;
    }),
  );
};

export default request;
