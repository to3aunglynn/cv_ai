const formatMonthYear = (value) => {
  if (!value) return "";

  const [year, month] = value.split("-");

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return `${monthNames[Number(month) - 1]} ${year}`;
};

export default formatMonthYear;