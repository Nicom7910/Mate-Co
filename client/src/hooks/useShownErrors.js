import { useState } from "react";

const useShownErrors = (errors, serverErrors = {}) => {
  const [touched, setTouched] = useState({});

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
  };

  const touch = (name) =>
    setTouched((previous) => ({ ...previous, [name]: true }));

  const shown = {
    ...Object.fromEntries(
      Object.entries(errors).filter(([name]) => touched[name]),
    ),
    ...serverErrors,
  };

  return { shown, handleBlur, touch };
};

export default useShownErrors;
