import { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../api/request.js";

const useAuthRequest = (path, onLogin, errorText) => {
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const send = (values) => {
    setSending(true);
    setError(null);
    request(path, { method: "POST", body: values })
      .then((data) => {
        onLogin(data.access_token);
        navigate("/");
      })
      .catch(() => setError(errorText))
      .finally(() => setSending(false));
  };

  return { send, error, sending };
};

export default useAuthRequest;
