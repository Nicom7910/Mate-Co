const FormError = ({ message }) =>
  message && (
    <p className="message message--error auth-form__full" role="alert">
      {message}
    </p>
  );

export default FormError;
