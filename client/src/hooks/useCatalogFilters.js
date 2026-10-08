import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useCatalogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [local, setLocal] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });
  const [page, setPage] = useState(1);

  const filters = { category: searchParams.get("category") ?? "", ...local };

  const setFilter = (name, value) => {
    setPage(1);
    if (name === "category") {
      setSearchParams(value ? { category: value } : {});
    } else {
      setLocal((previous) => ({ ...previous, [name]: value }));
    }
  };

  return { filters, setFilter, page, setPage };
};

export default useCatalogFilters;
