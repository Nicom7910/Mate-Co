import { useState } from "react";

const useAction = (action, onSuccess) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const run = (...args) => {
    setSending(true);
    setError(null);
    action(...args)
      .then((result) => onSuccess?.(result))
      .catch((err) => setError(err.message))
      .finally(() => setSending(false));
  };

  return { run, sending, error };
};

export default useAction;
