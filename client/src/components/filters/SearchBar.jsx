import "./SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Buscar productos por nombre...",
  label = "Buscar productos",
}) => (
  <input
    type="search"
    className="search-bar"
    placeholder={placeholder}
    aria-label={label}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default SearchBar;
