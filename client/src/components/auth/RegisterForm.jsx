import useAuthRequest from "../../hooks/useAuthRequest.js";
import useForm from "../../hooks/useForm.js";
import AuthForm from "./AuthForm.jsx";
import FormError from "./FormError.jsx";
import FormField from "./FormField.jsx";
import SubmitButton from "./SubmitButton.jsx";

const FIELDS = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Nicolás",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Apellido",
    placeholder: "Maidana",
    autoComplete: "family-name",
  },
  {
    name: "username",
    label: "Usuario",
    placeholder: "nicomaidana",
    autoComplete: "username",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "nico@mates.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
  },
  {
    name: "phone",
    label: "Teléfono",
    type: "tel",
    placeholder: "11 5555 5555",
    autoComplete: "tel",
  },
  {
    name: "address",
    label: "Dirección",
    placeholder: "Av. Siempreviva 742",
    autoComplete: "street-address",
    wide: true,
  },
];

const INITIAL_VALUES = {
  name: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};

const RegisterForm = ({ onLogin }) => {
  const { values, handleChange } = useForm(INITIAL_VALUES);
  const { send, error, sending } = useAuthRequest(
    "/api/v1/auth/register",
    onLogin,
    "No pudimos crear la cuenta. Puede que el email o el usuario ya estén registrados.",
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
        />
      ))}
      <FormError message={error} />
      <SubmitButton text="Crear cuenta" sending={sending} />
    </AuthForm>
  );
};

export default RegisterForm;
