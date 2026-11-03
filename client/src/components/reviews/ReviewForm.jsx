import { useState } from "react";
import { useDispatch } from "react-redux";
import useAction from "../../hooks/useAction.js";
import { createReview } from "../../redux/reviewsSlice.js";
import FormError from "../auth/FormError.jsx";
import StarPicker from "./StarPicker.jsx";
import "../auth/FormField.css";
import "./ReviewForm.css";

const MAX_COMMENT = 1000;

const ReviewForm = ({ productId, onCancel }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [missingRating, setMissingRating] = useState(false);
  const { run, sending, error, fieldErrors, clearFieldError } = useAction(
    (data) => dispatch(createReview({ productId, ...data })).unwrap(),
  );

  const handleRating = (value) => {
    setRating(value);
    setMissingRating(false);
    clearFieldError("rating");
  };

  const handleComment = (event) => {
    setComment(event.target.value);
    clearFieldError("comment");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating === 0) {
      setMissingRating(true);
      return;
    }
    run({ rating, comment });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <StarPicker
        value={rating}
        onChange={handleRating}
        error={
          missingRating
            ? "Elegí una puntuación de 1 a 5 estrellas."
            : fieldErrors.rating
        }
      />
      <div className="form-field">
        <label htmlFor={`review-comment-${productId}`} className="form-field__label">
          Comentario (opcional)
        </label>
        <textarea
          id={`review-comment-${productId}`}
          className="form-field__input review-form__comment"
          rows={3}
          maxLength={MAX_COMMENT}
          value={comment}
          onChange={handleComment}
          aria-invalid={Boolean(fieldErrors.comment)}
        />
        {fieldErrors.comment && (
          <p className="form-field__error" role="alert">
            {fieldErrors.comment}
          </p>
        )}
      </div>
      <FormError message={error} />
      <div className="review-form__actions">
        <button
          type="submit"
          className="btn btn--primary btn--small review-form__button"
          disabled={sending}
        >
          {sending ? "Enviando..." : "Publicar reseña"}
        </button>
        <button
          type="button"
          className="btn btn--outline btn--small review-form__button"
          disabled={sending}
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
