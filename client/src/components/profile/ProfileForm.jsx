import { useState } from "react";
import request from "../../api/request.js";
import useAction from "../../hooks/useAction.js";
import useForm from "../../hooks/useForm.js";
import useShownErrors from "../../hooks/useShownErrors.js";
import validateProfile from "../../utils/validateProfile.js";
import AuthForm from "../auth/AuthForm.jsx";
import FormError from "../auth/FormError.jsx";
import FormField from "../auth/FormField.jsx";
import FormSuccess from "../auth/FormSuccess.jsx";
import SubmitButton from "../auth/SubmitButton.jsx";
import SubmitHint from "../auth/SubmitHint.jsx";

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
  const [saved, setSaved] = useState(false);
  const save = (data) =>
    request("/users/me", { method: "PUT", body: data, token });
  const { run, sending, error, fieldErrors, clearFieldError } = useAction(
    save,
    (updated) => {
      onSaved(updated);
      setSaved(true);
    },
  );
  const { values, handleChange } = useForm(
    {
      name: user.name,
      lastName: user.lastName,
      phone: user.phone ?? "",
      address: user.address ?? "",
    },
    (name) => {
      clearFieldError(name);
      setSaved(false);
    },
  );

  const errors = validateProfile(values);
  const { shown, handleBlur } = useShownErrors(errors, fieldErrors);
  const invalid = Object.keys(errors).length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (invalid) return;
    setSaved(false);
    run(values);
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
        />
      ))}
      <FormError message={error} />
      <FormSuccess message={saved ? "Cambios guardados." : null} />
      <SubmitHint show={invalid} />
      <SubmitButton text="Guardar cambios" sending={sending} disabled={invalid} />
    </AuthForm>
  );
};

export default ProfileForm;
