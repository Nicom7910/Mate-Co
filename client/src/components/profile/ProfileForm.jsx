import { useState } from "react";
import request from "../../api/request.js";
import useAction from "../../hooks/useAction.js";
import useForm from "../../hooks/useForm.js";
import AuthForm from "../auth/AuthForm.jsx";
import FormError from "../auth/FormError.jsx";
import FormField from "../auth/FormField.jsx";
import FormSuccess from "../auth/FormSuccess.jsx";
import SubmitButton from "../auth/SubmitButton.jsx";

const FIELDS = [
  { name: "name", label: "Nombre", autoComplete: "given-name" },
  { name: "lastName", label: "Apellido", autoComplete: "family-name" },
  { name: "phone", label: "Teléfono", type: "tel", autoComplete: "tel" },
  {
    name: "address",
    label: "Dirección",
    autoComplete: "street-address",
    wide: true,
  },
];

const ProfileForm = ({ user, token, onSaved }) => {
  const { values, handleChange } = useForm({
    name: user.name,
    lastName: user.lastName,
    phone: user.phone ?? "",
    address: user.address ?? "",
  });
  const [saved, setSaved] = useState(false);
  const save = (data) =>
    request("/users/me", { method: "PUT", body: data, token });
  const { run, sending, error } = useAction(save, (updated) => {
    onSaved(updated);
    setSaved(true);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(false);
    run(values);
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
      <FormSuccess message={saved ? "Cambios guardados." : null} />
      <SubmitButton text="Guardar cambios" sending={sending} />
    </AuthForm>
  );
};

export default ProfileForm;
