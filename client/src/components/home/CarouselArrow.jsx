import "./CarouselArrow.css";

const LABELS = {
  prev: "Ver productos anteriores",
  next: "Ver productos siguientes",
};
const POINTS = { prev: "15 18 9 12 15 6", next: "9 18 15 12 9 6" };

const CarouselArrow = ({ direction, onClick, disabled }) => (
  <button
    type="button"
    className={`carousel-arrow carousel-arrow--${direction}`}
    onClick={onClick}
    disabled={disabled}
    aria-label={LABELS[direction]}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points={POINTS[direction]} />
    </svg>
  </button>
);

export default CarouselArrow;
