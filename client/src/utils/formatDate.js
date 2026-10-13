const formatDate = (isoDate) =>
  new Date(isoDate.slice(0, 19)).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default formatDate;
