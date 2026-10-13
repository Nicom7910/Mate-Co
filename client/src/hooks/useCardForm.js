import { useState } from "react";
import maskCardField from "../utils/maskCardField.js";
import validateCard from "../utils/validateCard.js";

const useCardForm = () => {
  const [values, setValues] = useState({
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({
      ...previous,
      [name]: maskCardField(name, value),
    }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const validate = () => {
    const found = validateCard(values);
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  return { values, errors, handleChange, validate };
};

export default useCardForm;
