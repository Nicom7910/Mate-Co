import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderSearch.css";

const HeaderSearch = ({ onSearch }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = text.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
    onSearch?.();
  };

  return (
    <form className="header-search" role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        className="header-search__input"
        placeholder="Buscar productos"
        aria-label="Buscar productos"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        type="submit"
        className="header-search__button"
        aria-label="Buscar"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
      </button>
    </form>
  );
};

export default HeaderSearch;
