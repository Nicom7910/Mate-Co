import { useRef } from "react";

const usePageChange = (setPage) => {
  const targetRef = useRef(null);

  const changePage = (page) => {
    setPage(page);
    targetRef.current?.scrollIntoView({ block: "start" });
  };

  return { targetRef, changePage };
};

export default usePageChange;
