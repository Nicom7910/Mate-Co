import { useState } from "react";

const useCarousel = (count) => {
  const [selected, setSelected] = useState(0);
  const index = Math.min(selected, Math.max(count - 1, 0));

  const next = () => setSelected((index + 1) % count);
  const prev = () => setSelected((index - 1 + count) % count);

  return { index, next, prev, goTo: setSelected };
};

export default useCarousel;
