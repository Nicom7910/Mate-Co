import "./SubmitHint.css";

const SubmitHint = ({
  show,
  text = "Completá los campos obligatorios para poder guardar.",
}) => show && <p className="submit-hint auth-form__full">{text}</p>;

export default SubmitHint;
