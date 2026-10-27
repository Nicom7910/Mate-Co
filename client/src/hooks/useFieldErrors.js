import { useState } from "react";

const useFieldErrors = () => {
  const [fieldErrors, setFieldErrors] = useState({});

  const clearFieldError = (name) =>
    setFieldErrors((previous) => {
      if (!(name in previous)) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });

  return { fieldErrors, setFieldErrors, clearFieldError };
};

export default useFieldErrors;
