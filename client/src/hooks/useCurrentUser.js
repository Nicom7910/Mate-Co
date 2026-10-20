import { useEffect, useState } from "react";
import request from "../api/request.js";

const useCurrentUser = (token) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();

    request("/users/me", { token, signal: controller.signal })
      .then((data) => setUser(data))
      .catch(() => {})
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [token]);

  const reset = () => {
    setUser(null);
    setLoading(false);
  };

  return { user, loading, reset, update: setUser };
};

export default useCurrentUser;
