import "./ResultsCount.css";

const ResultsCount = ({ page, pageSize, count, total, noun }) => {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, count);
  const range = from === to ? from : `${from}-${to}`;

  return (
    <p className="results-count">
      Mostrando {range} de {count} {noun}
      {count !== total && ` (${total} en total)`}
    </p>
  );
};

export default ResultsCount;
