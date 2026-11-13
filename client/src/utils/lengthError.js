const lengthError = (label, value, max) => {
  const length = (value ?? "").length;
  return length > max
    ? `${label} puede tener hasta ${max} caracteres. Ahora tiene ${length}.`
    : null;
};

export default lengthError;
