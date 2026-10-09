import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sendJson from "../api/sendJson.js";

const useAuthRequest = (path, onLogin, errorText) => {
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const send = (values) => {
    setSending(true);
    setError(null);
    sendJson(path, "POST", values)
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
