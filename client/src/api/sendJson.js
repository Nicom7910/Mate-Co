import { API_URL } from "./config.js";

const sendJson = (path, method, body, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  });
};

export default sendJson;
