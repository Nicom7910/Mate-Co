import "./QuantitySelector.css";

const QuantitySelector = ({ value, max, onChange }) => (
  <div className="quantity-selector">
    <span className="quantity-selector__label">Cantidad</span>
    <div className="quantity-selector__control">
      <button
        type="button"
        aria-label="Restar uno"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        aria-label="Sumar uno"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  </div>
);

export default QuantitySelector;
