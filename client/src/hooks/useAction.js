import { useState } from "react";
import useFieldErrors from "./useFieldErrors.js";

const useAction = (action, onSuccess, onError) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const { fieldErrors, setFieldErrors, clearFieldError } = useFieldErrors();

  const run = (...args) => {
    setSending(true);
    setError(null);
    setFieldErrors({});
    action(...args)
      .then((result) => onSuccess?.(result))
      .catch((err) => {
        setFieldErrors(err.fields ?? {});
        setError(err.fields ? null : err.message);
        onError?.(err.message);
      })
      .finally(() => setSending(false));
  };

  return { run, sending, error, fieldErrors, clearFieldError };
};

export default useAction;
