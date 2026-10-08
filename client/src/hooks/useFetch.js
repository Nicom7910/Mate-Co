import { useEffect, useState } from "react";
import { API_URL } from "../api/config.js";

const useFetch = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}${path}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Error ${response.status}`);
        return response.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [path]);

  return { data, loading, error };
};

export default useFetch;
