import "./DeleteError.css";

const DeleteError = ({ message, onClose }) =>
  message && (
    <div className="delete-error" role="alert">
      <p className="delete-error__text">{message}</p>
      <button type="button" className="admin-action" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );

export default DeleteError;
