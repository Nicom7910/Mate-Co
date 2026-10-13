import "./FormSuccess.css";

const FormSuccess = ({ message }) =>
  message && (
    <p className="form-success auth-form__full" role="status">
      {message}
    </p>
  );

export default FormSuccess;
