const addBusinessDays = (date, days) => {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  let added = 0;

  while (added < days) {
    result.setDate(result.getDate() + 1);
    const weekDay = result.getDay();
    if (weekDay !== 0 && weekDay !== 6) added++;
  }

  return result;
};

export default addBusinessDays;
