const averageRating = (reviews) =>
  reviews.length === 0
    ? 0
    : reviews.reduce((sum, { rating }) => sum + rating, 0) / reviews.length;

export default averageRating;
