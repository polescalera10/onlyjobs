export const translate = (type) => {
  const types = {
    once: "Puntual - 1 vez",
    fixed: "Fijo - recurrente",
  };
  return types[type];
};
