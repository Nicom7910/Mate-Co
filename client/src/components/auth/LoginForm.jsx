import useAuthRequest from "../../hooks/useAuthRequest.js";
import useForm from "../../hooks/useForm.js";
import AuthForm from "./AuthForm.jsx";
import FormError from "./FormError.jsx";
import FormField from "./FormField.jsx";
import SubmitButton from "./SubmitButton.jsx";

const FIELDS = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "usuario1@mates.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "current-password",
  },
];

const LoginForm = ({ onLogin }) => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const { send, error, sending } = useAuthRequest(
    "/api/v1/auth/authenticate",
    onLogin,
    "Email o contraseña incorrectos.",
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    send(values);
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      {FIELDS.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={values[field.name]}
          onChange={handleChange}
          wide
        />
      ))}
      <FormError message={error} />
      <SubmitButton text="Ingresar" sending={sending} />
    </AuthForm>
  );
};

export default LoginForm;
