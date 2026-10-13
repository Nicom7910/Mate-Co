import { Link } from "react-router-dom";
import useAction from "../../hooks/useAction.js";
import useCardForm from "../../hooks/useCardForm.js";
import formatPrice from "../../utils/formatPrice.js";
import AuthForm from "../auth/AuthForm.jsx";
import FormError from "../auth/FormError.jsx";
import SubmitButton from "../auth/SubmitButton.jsx";
import BuyerData from "./BuyerData.jsx";
import PaymentFields from "./PaymentFields.jsx";

const CheckoutForm = ({ user, total, onPay, onPaid }) => {
  const card = useCardForm();
  const { run, sending, error } = useAction(onPay, onPaid);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (card.validate()) run();
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      <BuyerData user={user} />
      <PaymentFields card={card} />
      <FormError message={error} />
      <SubmitButton
        text={`Pagar ${formatPrice(total)}`}
        sending={sending}
        sendingText="Procesando pago..."
      />
      <Link
        to="/cart"
        className="btn btn--outline submit-button auth-form__full"
      >
        Volver al carrito
      </Link>
    </AuthForm>
  );
};

export default CheckoutForm;
