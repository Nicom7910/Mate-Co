import { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../api/request.js";

// Login y registro. Si el backend marca campos puntuales (email repetido,
// usuario repetido...) van en fieldErrors; si no, se muestra errorText.
const useAuthRequest = (path, onLogin, errorText) => {
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [sending, setSending] = useState(false);
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

  const clearFieldError = (name) =>
    setFieldErrors((previous) => {
      if (!(name in previous)) return previous;
      const { [name]: _removed, ...rest } = previous;
      return rest;
    });

  return { send, error, sending, fieldErrors, clearFieldError };
};

export default useAuthRequest;
