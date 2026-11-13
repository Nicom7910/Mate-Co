import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAction from "./useAction.js";

const useAuthRequest = (thunk, errorText) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { run, sending, error, fieldErrors, clearFieldError } = useAction(
    (values) => dispatch(thunk(values)).unwrap(),
    () => navigate("/"),
  );

  return {
    send: run,
    error: error && (errorText ?? error),
    sending,
    fieldErrors,
    clearFieldError,
  };
};

export default useAuthRequest;
