const CartError = ({ message }) =>
  message && (
    <p className="message message--error" role="alert">
      {message}
    </p>
  );

export default CartError;
