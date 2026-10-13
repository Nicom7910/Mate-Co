import FormField from "../auth/FormField.jsx";
import CheckoutGroup from "./CheckoutGroup.jsx";

const FIELDS = [
  {
    name: "holder",
    label: "Titular de la tarjeta",
    autoComplete: "cc-name",
    wide: true,
  },
  {
    name: "number",
    label: "Número de tarjeta",
    placeholder: "1234 5678 9012 3456",
    autoComplete: "cc-number",
    inputMode: "numeric",
    wide: true,
  },
  {
    name: "expiry",
    label: "Vencimiento",
    placeholder: "MM/AA",
    autoComplete: "cc-exp",
    inputMode: "numeric",
  },
  {
    name: "cvv",
    label: "Código de seguridad",
    placeholder: "123",
    autoComplete: "cc-csc",
    inputMode: "numeric",
  },
];

const PaymentFields = ({ card }) => (
  <CheckoutGroup title="Pago con tarjeta">
    {FIELDS.map((field) => (
      <FormField
        key={field.name}
        {...field}
        value={card.values[field.name]}
        error={card.errors[field.name]}
        onChange={card.handleChange}
      />
    ))}
    <p className="checkout-group__note auth-form__full">
      Pago simulado: los datos de la tarjeta no se guardan ni se envían a ningún
      lado.
    </p>
  </CheckoutGroup>
);

export default PaymentFields;
