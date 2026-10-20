import { useState } from "react";

// Muestra el error de un campo recién después de que el usuario pasó por él.
const useShownErrors = (errors) => {
  const [touched, setTouched] = useState({});

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
  };

  const shown = Object.fromEntries(
    Object.entries(errors).filter(([name]) => touched[name]),
  );

  return { shown, handleBlur };
};

export default useShownErrors;
