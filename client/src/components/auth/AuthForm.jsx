import "./AuthForm.css";

const AuthForm = ({ onSubmit, children }) => (
  <form className="auth-form" onSubmit={onSubmit}>
    {children}
  </form>
);

export default AuthForm;
