const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export const formatDate = (date) => {
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth();

  return `${day} ${months[month]} ${year}`;
};
