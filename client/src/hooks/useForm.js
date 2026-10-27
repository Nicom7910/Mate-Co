import { useState } from "react";

// onFieldChange(name) avisa qué campo se editó (sirve para limpiar el error
// que había venido del servidor para ese campo).
const useForm = (initialValues, onFieldChange) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    onFieldChange?.(name);
  };

  return { values, handleChange };
};

export default useForm;
