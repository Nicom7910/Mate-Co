import averageRating from "../../utils/averageRating.js";
import StarRating from "./StarRating.jsx";

const ReviewSummary = ({ reviews }) => {
  const average = averageRating(reviews);

  return (
    <p className="review-summary">
      <strong className="review-summary__average">
        {average.toFixed(1).replace(".", ",")}
      </strong>
      <StarRating value={average} />
      <span className="review-summary__count">
        {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
      </span>
    </p>
  );
};

export default ReviewSummary;
