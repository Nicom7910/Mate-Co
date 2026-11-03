import formatDate from "../../utils/formatDate.js";
import StarRating from "./StarRating.jsx";

const ReviewItem = ({ review }) => (
  <li className="review-item">
    <div className="review-item__head">
      <StarRating value={review.rating} />
      <strong className="review-item__author">{review.userName}</strong>
      <span className="review-item__date">{formatDate(review.createdAt)}</span>
    </div>
    {review.comment && <p className="review-item__comment">{review.comment}</p>}
  </li>
);

export default ReviewItem;
