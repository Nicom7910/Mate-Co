import "./AddToCartMessage.css";

const AddToCartMessage = ({ error }) =>
  error && (
    <p className="message message--error add-to-cart-message" role="alert">
      {error}
    </p>
  );

export default AddToCartMessage;
