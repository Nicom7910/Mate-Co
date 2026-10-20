import useAuthRequest from "../../hooks/useAuthRequest.js";
import useForm from "../../hooks/useForm.js";
import useShownErrors from "../../hooks/useShownErrors.js";
import validateLogin from "../../utils/validateLogin.js";
import AuthForm from "./AuthForm.jsx";
import FormError from "./FormError.jsx";
import FormField from "./FormField.jsx";
import SubmitButton from "./SubmitButton.jsx";
import SubmitHint from "./SubmitHint.jsx";

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

  const errors = validateLogin(values);
  const { shown, handleBlur } = useShownErrors(errors);
  const invalid = Object.keys(errors).length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!invalid) send(values);
  };

  return (
    <AuthForm onSubmit={handleSubmit} noValidate>
      {FIELDS.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={values[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={shown[field.name]}
          wide
        />
      ))}
      <FormError message={error} />
      <SubmitHint show={invalid} text="Completá tu email y contraseña para ingresar." />
      <SubmitButton text="Ingresar" sending={sending} disabled={invalid} />
    </AuthForm>
  );
};

export default LoginForm;
