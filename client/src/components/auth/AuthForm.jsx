import "./AuthForm.css";

const AuthForm = ({ onSubmit, noValidate = false, children }) => (
  <form className="auth-form" onSubmit={onSubmit} noValidate={noValidate}>
    {children}
  </form>
);

export default AuthForm;
