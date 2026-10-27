import { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../api/request.js";
import useFieldErrors from "./useFieldErrors.js";

const useAuthRequest = (path, onLogin, errorText) => {
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const { fieldErrors, setFieldErrors, clearFieldError } = useFieldErrors();
  const navigate = useNavigate();

  const send = (values) => {
    setSending(true);
    setError(null);
    setFieldErrors({});
    request(path, { method: "POST", body: values })
      .then((data) => {
        onLogin(data.access_token);
        navigate("/");
      })
      .catch((err) => {
        if (err.fields) setFieldErrors(err.fields);
        else setError(errorText);
      })
      .finally(() => setSending(false));
  };

  return { send, error, sending, fieldErrors, clearFieldError };
};

export default useAuthRequest;
