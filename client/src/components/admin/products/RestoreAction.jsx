import useAction from "../../../hooks/useAction.js";
import "../AdminActions.css";

const RestoreAction = ({ onRestore, onRestored, onError }) => {
  const { run, sending } = useAction(onRestore, onRestored, onError);

  return (
    <button
      type="button"
      className="admin-action"
      disabled={sending}
      onClick={() => run()}
    >
      {sending ? "Restaurando..." : "Restaurar"}
    </button>
  );
};

export default RestoreAction;
