export function getMonthName(monthNumber: number) {
  //Jan=0...Dez=11
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("pt-BR", { month: "long" }).substring(0, 3);
}
