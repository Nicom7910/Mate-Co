import "./CategoryFilter.css";

const CategoryFilter = ({ categories, selected, onChange }) => {
  const options = [{ id: "", name: "Todas" }, ...categories];

  return (
    <fieldset className="category-filter">
      <legend className="filter-title">Categoría</legend>
      {options.map(({ id, name }) => (
        <label key={id} className="category-filter__option">
          <input
            type="radio"
            name="category"
            checked={selected === String(id)}
            onChange={() => onChange(String(id))}
          />
          <span>{name}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default CategoryFilter;
