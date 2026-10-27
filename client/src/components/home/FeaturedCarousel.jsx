import { useState } from "react";
import useSwipe from "../../hooks/useSwipe.js";
import paginate from "../../utils/paginate.js";
import ProductGrid from "../products/ProductGrid.jsx";
import CarouselArrow from "./CarouselArrow.jsx";
import CarouselDots from "./CarouselDots.jsx";
import "./FeaturedCarousel.css";

const PAGE_SIZE = 4;

const FeaturedCarousel = ({ products }) => {
  const [page, setPage] = useState(1);
  const { totalPages, current } = paginate(products, page, PAGE_SIZE);
  const pages = Array.from(
    { length: totalPages },
    (_, index) => paginate(products, index + 1, PAGE_SIZE).items,
  );

  const goPrev = () => setPage(Math.max(current - 1, 1));
  const goNext = () => setPage(Math.min(current + 1, totalPages));
  const swipe = useSwipe(goPrev, goNext);

  if (totalPages === 1) return <ProductGrid products={pages[0]} />;

  return (
    <div className="carousel">
      <CarouselArrow
        direction="prev"
        onClick={goPrev}
        disabled={current === 1}
      />
      <div className="carousel__viewport" {...swipe}>
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${(current - 1) * 100}%)` }}
        >
          {pages.map((items, index) => (
            <div
              className="carousel__page"
              key={index}
              inert={index !== current - 1}
            >
              <ProductGrid products={items} />
            </div>
          ))}
        </div>
      </div>
      <CarouselArrow
        direction="next"
        onClick={goNext}
        disabled={current === totalPages}
      />
      <CarouselDots total={totalPages} current={current} onChange={setPage} />
    </div>
  );
};

export default FeaturedCarousel;
