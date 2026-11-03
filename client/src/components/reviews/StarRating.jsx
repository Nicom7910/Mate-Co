import "./StarRating.css";

const STARS = [1, 2, 3, 4, 5];

const StarRating = ({ value }) => (
  <span
    className="star-rating"
    role="img"
    aria-label={`${value.toFixed(1).replace(".", ",")} de 5 estrellas`}
  >
    {STARS.map((star) => (
      <span
        key={star}
        className={
          star <= Math.round(value)
            ? "star-rating__star star-rating__star--on"
            : "star-rating__star"
        }
        aria-hidden="true"
      >
        ★
      </span>
    ))}
  </span>
);

export default StarRating;
