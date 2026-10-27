import { useState } from "react";

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
