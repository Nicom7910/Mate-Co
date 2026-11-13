import axios from "axios";
import { API_URL } from "./config.js";

const client = axios.create({ baseURL: API_URL });

const statusMessage = (status) => {
  if (!status)
    return "No pudimos conectar con el servidor. Revisá tu conexión e intentá de nuevo.";
  if (status === 401) return "Tu sesión venció. Ingresá de nuevo para continuar.";
  if (status === 403) return "No tenés permiso para hacer esto.";
  if (status === 404) return "No encontramos lo que buscabas.";
  if (status === 413) return "El archivo es demasiado grande.";
  if (status >= 500)
    return "Ocurrió un error en el servidor. Probá de nuevo en unos minutos.";
  return `Ocurrió un error inesperado (código ${status}).`;
};

const request = (path, { method = "GET", body, token, signal } = {}) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return client
    .request({ url: path, method, data: body, headers, signal })
    .then((response) => (response.data === "" ? null : response.data))
    .catch((error) => {
      if (axios.isCancel(error)) throw error;
      const data = error.response?.data;
      const failure = new Error(
        data?.message ?? statusMessage(error.response?.status),
      );
      failure.fields = data?.errors ?? null;
      failure.status = error.response?.status ?? null;
      throw failure;
    });
};

export default request;
