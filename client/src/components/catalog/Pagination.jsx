import PageButton from "./PageButton.jsx";
import "./Pagination.css";

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="pagination" aria-label="Paginación">
      <PageButton
        label="Anterior"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      />
      {numbers.map((number) => (
        <PageButton
          key={number}
          label={number}
          onClick={() => onChange(number)}
          active={number === page}
        />
      ))}
      <PageButton
        label="Siguiente"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      />
    </nav>
  );
};

export default Pagination;
