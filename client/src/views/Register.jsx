import AuthCard from "../components/auth/AuthCard.jsx";
import AuthSwitch from "../components/auth/AuthSwitch.jsx";
import RegisterForm from "../components/auth/RegisterForm.jsx";

const Register = () => (
  <AuthCard
    wide
    title="Crear cuenta"
    subtitle="Con tu cuenta podés armar el carrito y ver tus pedidos. Al registrarte entrás directamente, sin volver a loguearte."
  >
    <RegisterForm />
    <AuthSwitch text="¿Ya tenés cuenta?" linkText="Ingresar" to="/login" />
  </AuthCard>
);

export default Register;
