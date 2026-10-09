import "./SubmitButton.css";

const SubmitButton = ({ text, sending = false }) => (
  <button
    type="submit"
    className="btn btn--primary submit-button auth-form__full"
    disabled={sending}
  >
    {sending ? "Enviando..." : text}
  </button>
);

export default SubmitButton;
