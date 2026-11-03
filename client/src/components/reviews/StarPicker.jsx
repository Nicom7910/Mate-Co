import "./StarPicker.css";

const STARS = [1, 2, 3, 4, 5];

const StarPicker = ({ value, onChange, error }) => (
  <fieldset className="star-picker">
    <legend className="star-picker__legend">Puntuación</legend>
    <div className="star-picker__stars">
      {STARS.map((star) => (
        <label
          key={star}
          className={
            star <= value
              ? "star-picker__star star-picker__star--on"
              : "star-picker__star"
          }
        >
          <input
            type="radio"
            name="rating"
            value={star}
            checked={value === star}
            onChange={() => onChange(star)}
            className="star-picker__input"
            aria-label={`${star} ${star === 1 ? "estrella" : "estrellas"}`}
          />
          <span aria-hidden="true">★</span>
        </label>
      ))}
    </div>
    {error && (
      <p className="form-field__error" role="alert">
        {error}
      </p>
    )}
  </fieldset>
);

export default StarPicker;
