export function formatDate(date, format = "medium") {
    // format time = "short" | "medium" | "long" | "full"
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: format }).format(new Date(date));
}


export function formatHours(date, format = "short") {
    // format time = "short" | "medium" | "long" | "full"
  return new Intl.DateTimeFormat("fr-FR", { timeStyle: format }).format(new Date(date));
}