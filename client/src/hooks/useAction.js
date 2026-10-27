import { useState } from "react";

// Ejecuta una acción async y expone: sending, error general y los errores por
// campo que devuelve el backend (fieldErrors). clearFieldError borra el de un
// campo cuando el usuario lo vuelve a editar.
const useAction = (action, onSuccess, onError) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

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

  const clearFieldError = (name) =>
    setFieldErrors((previous) => {
      if (!(name in previous)) return previous;
      const { [name]: _removed, ...rest } = previous;
      return rest;
    });

  return { run, sending, error, fieldErrors, clearFieldError };
};

export default useAction;
