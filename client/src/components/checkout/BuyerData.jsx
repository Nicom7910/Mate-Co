import { Link } from "react-router-dom";
import FormField from "../auth/FormField.jsx";
import CheckoutGroup from "./CheckoutGroup.jsx";

const FIELDS = [
  { name: "name", label: "Nombre" },
  { name: "lastName", label: "Apellido" },
  { name: "email", label: "Email", type: "email" },
  { name: "address", label: "Dirección de entrega", wide: true },
];

const BuyerData = ({ user }) => (
  <CheckoutGroup title="Tus datos">
    {FIELDS.map((field) => (
      <FormField
        key={field.name}
        {...field}
        value={user[field.name] ?? ""}
        readOnly
        required={false}
      />
    ))}
    <p className="checkout-group__note auth-form__full">
      ¿Algo no es correcto? Podés cambiarlo desde{" "}
      <Link to="/profile">Mi perfil</Link>.
    </p>
  </CheckoutGroup>
);

export default BuyerData;
