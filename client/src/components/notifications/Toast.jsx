import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { dismissNotice } from "../../redux/notificationsSlice.js";

const TOAST_DURATION = 5000;

const Toast = ({ notice }) => {
  const dispatch = useDispatch();
  const { id, message, to, linkText } = notice;

  useEffect(() => {
    const timer = setTimeout(() => dispatch(dismissNotice(id)), TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [dispatch, id]);

  return (
    <div className="toast">
      <p className="toast__message">{message}</p>
      {to && (
        <Link
          to={to}
          className="toast__link"
          onClick={() => dispatch(dismissNotice(id))}
        >
          {linkText}
        </Link>
      )}
      <button
        type="button"
        className="toast__close"
        aria-label="Cerrar aviso"
        onClick={() => dispatch(dismissNotice(id))}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
