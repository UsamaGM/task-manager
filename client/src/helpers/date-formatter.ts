export function getFormattedDateNDaysLater(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export function formattedDateToday() {
  return new Date().toISOString().split("T")[0];
}

export function getFormattedDate(date: string) {
  return date.split("T")[0];
}
