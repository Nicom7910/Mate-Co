import { useEffect, useState } from "react";
import request from "../api/request.js";

const useFetch = (path, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    request(path, { token, signal: controller.signal })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [path, token, reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  return { data, loading, error, reload };
};

export default useFetch;
