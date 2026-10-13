import "./CarouselDots.css";

const CarouselDots = ({ total, current, onChange }) => {
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div className="carousel-dots">
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          className={`carousel-dot ${
            number === current ? "carousel-dot--active" : ""
          }`}
          onClick={() => onChange(number)}
          aria-label={`Ir al grupo ${number} de ${total}`}
          aria-current={number === current ? "true" : undefined}
        />
      ))}
    </div>
  );
};

export default CarouselDots;
