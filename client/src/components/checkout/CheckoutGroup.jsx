import "./CheckoutGroup.css";

const CheckoutGroup = ({ title, children }) => (
  <fieldset className="checkout-group auth-form__full">
    <legend className="checkout-group__title">{title}</legend>
    <div className="auth-form">{children}</div>
  </fieldset>
);

export default CheckoutGroup;
