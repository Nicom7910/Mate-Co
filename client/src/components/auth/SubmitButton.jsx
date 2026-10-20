import "./SubmitButton.css";

const SubmitButton = ({
  text,
  sending = false,
  disabled = false,
  sendingText = "Enviando...",
}) => (
  <button
    type="submit"
    className={`btn btn--primary submit-button auth-form__full${sending ? " submit-button--sending" : ""}`}
    disabled={sending || disabled}
  >
    {sending ? sendingText : text}
  </button>
);

export default SubmitButton;
