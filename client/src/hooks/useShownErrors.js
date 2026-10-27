import { useState } from "react";

// Los errores de validación local se muestran recién cuando el usuario pasó por
// el campo. Los que manda el servidor (serverErrors) se muestran siempre, porque
// ya son consecuencia de un envío.
const useShownErrors = (errors, serverErrors = {}) => {
  const [touched, setTouched] = useState({});

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
  };

  const shown = {
    ...Object.fromEntries(
      Object.entries(errors).filter(([name]) => touched[name]),
    ),
    ...serverErrors,
  };

  return { shown, handleBlur };
};

export default useShownErrors;
