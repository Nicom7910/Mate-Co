const FetchState = ({
  loading,
  error,
  loadingText = "Cargando...",
  children,
}) => {
  if (loading) return <p className="message">{loadingText}</p>;
  if (error) {
    return (
      <p className="message message--error">
        No pudimos cargar la información ({error}).
      </p>
    );
  }
  return children;
};

export default FetchState;
