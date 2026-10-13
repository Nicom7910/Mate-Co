import { useState } from "react";
import paginate from "../../utils/paginate.js";
import ProductGrid from "../products/ProductGrid.jsx";
import CarouselArrow from "./CarouselArrow.jsx";
import CarouselDots from "./CarouselDots.jsx";
import "./FeaturedCarousel.css";

const PAGE_SIZE = 4;

const FeaturedCarousel = ({ products }) => {
  const [page, setPage] = useState(1);
  const { items, totalPages, current } = paginate(products, page, PAGE_SIZE);

  if (totalPages === 1) return <ProductGrid products={items} />;

  return (
    <div className="carousel">
      <CarouselArrow
        direction="prev"
        onClick={() => setPage(current - 1)}
        disabled={current === 1}
      />
      <div className="carousel__page" key={current}>
        <ProductGrid products={items} />
      </div>
      <CarouselArrow
        direction="next"
        onClick={() => setPage(current + 1)}
        disabled={current === totalPages}
      />
      <CarouselDots total={totalPages} current={current} onChange={setPage} />
    </div>
  );
};

export default FeaturedCarousel;
