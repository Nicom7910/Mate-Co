import { useSelector } from "react-redux";
import useLoad from "../../hooks/useLoad.js";
import {
  fetchReviews,
  selectReviews,
  selectReviewsError,
  selectReviewsLoading,
} from "../../redux/reviewsSlice.js";
import FetchState from "../common/FetchState.jsx";
import SectionTitle from "../common/SectionTitle.jsx";
import ReviewItem from "./ReviewItem.jsx";
import ReviewSummary from "./ReviewSummary.jsx";
import "./ProductReviews.css";

const ProductReviews = ({ productId }) => {
  useLoad(fetchReviews, productId);
  const reviews = useSelector(selectReviews(productId));
  const loading = useSelector(selectReviewsLoading(productId));
  const error = useSelector(selectReviewsError(productId));

  return (
    <section className="product-reviews">
      <SectionTitle title="Reseñas" />
      <FetchState
        loading={loading}
        error={error}
        loadingText="Cargando reseñas..."
      >
        {reviews.length === 0 ? (
          <p className="message">
            Todavía no hay reseñas. Si ya recibiste este producto, podés dejar
            la tuya desde Mis pedidos.
          </p>
        ) : (
          <>
            <ReviewSummary reviews={reviews} />
            <ul className="product-reviews__list">
              {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </ul>
          </>
        )}
      </FetchState>
    </section>
  );
};

export default ProductReviews;
