import { API_URL } from "./config.js";

const readBody = (response) =>
  response.status === 204
    ? Promise.resolve(null)
    : response.json().catch(() => null);

const request = (path, { method = "GET", body, token, signal } = {}) => {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  }).then((response) =>
    readBody(response).then((data) => {
      if (!response.ok)
        throw new Error(data?.message ?? `Error ${response.status}`);
      return data;
    }),
  );
};

export default request;
