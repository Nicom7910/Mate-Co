import AuthCard from "../components/auth/AuthCard.jsx";
import AuthSwitch from "../components/auth/AuthSwitch.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";

const Login = ({ onLogin }) => (
  <AuthCard title="Ingresar" subtitle="Entrá con tu email y tu contraseña.">
    <LoginForm onLogin={onLogin} />
    <AuthSwitch
      text="¿No tenés cuenta?"
      linkText="Crear cuenta"
      to="/register"
    />
  </AuthCard>
);

export default Login;
