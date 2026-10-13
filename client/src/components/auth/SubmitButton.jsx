import "./SubmitButton.css";

const SubmitButton = ({
  text,
  sending = false,
  sendingText = "Enviando...",
}) => (
  <button
    type="submit"
    className="btn btn--primary submit-button auth-form__full"
    disabled={sending}
  >
    {sending ? sendingText : text}
  </button>
);

export default SubmitButton;
