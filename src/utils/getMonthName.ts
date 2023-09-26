export function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("pt-BR", { month: "long" }).substring(0, 3);
}
