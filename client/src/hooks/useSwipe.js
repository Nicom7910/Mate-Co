import { useRef } from "react";

const MIN_DISTANCE = 50;

const useSwipe = (onPrev, onNext) => {
  const start = useRef(null);

  const onTouchStart = (event) => {
    start.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (start.current === null) return;
    const distance = event.changedTouches[0].clientX - start.current;
    start.current = null;
    if (distance <= -MIN_DISTANCE) onNext();
    else if (distance >= MIN_DISTANCE) onPrev();
  };

  return { onTouchStart, onTouchEnd };
};

export default useSwipe;
