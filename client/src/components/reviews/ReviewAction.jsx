import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectMyReview } from "../../redux/reviewsSlice.js";
import ReviewForm from "./ReviewForm.jsx";
import StarRating from "./StarRating.jsx";
import "./ReviewAction.css";

const ReviewAction = ({ productId, available = true }) => {
  const review = useSelector(selectMyReview(productId));
  const [open, setOpen] = useState(false);

  if (review) {
    return (
      <div className="review-action__done">
        <p className="review-action__title">
          Tu reseña <StarRating value={review.rating} />
        </p>
        {review.comment && (
          <p className="review-action__comment">{review.comment}</p>
        )}
        {available && (
          <Link
            to={`/products/${productId}`}
            className="review-action__link"
          >
            Ver todas las reseñas
          </Link>
        )}
      </div>
    );
  }

  if (open)
    return <ReviewForm productId={productId} onCancel={() => setOpen(false)} />;

  return (
    <button
      type="button"
      className="review-action__button"
      onClick={() => setOpen(true)}
    >
      Reseñar producto
    </button>
  );
};

export default ReviewAction;
