import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const URL_FILTERS = ["category", "search"];

const useCatalogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [local, setLocal] = useState({ minPrice: "", maxPrice: "" });
  const [page, setPage] = useState(1);

  const filters = {
    category: searchParams.get("category") ?? "",
    search: searchParams.get("search") ?? "",
    ...local,
  };

  const setFilter = (name, value) => {
    setPage(1);
    if (URL_FILTERS.includes(name)) {
      const next = new URLSearchParams(searchParams);
      if (value) next.set(name, value);
      else next.delete(name);
      setSearchParams(next, { replace: name === "search" });
    } else {
      setLocal((previous) => ({ ...previous, [name]: value }));
    }
  };

  return { filters, setFilter, page, setPage };
};

export default useCatalogFilters;
