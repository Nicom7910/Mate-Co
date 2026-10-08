import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => (
  <input
    type="search"
    className="search-bar"
    placeholder="Buscar productos por nombre..."
    aria-label="Buscar productos"
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default SearchBar;
