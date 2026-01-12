export function formatDate(date: string) {
  const d = new Date(date);

  return {
    iso: d.toISOString().split("T")[0],
    text: d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC", 
    }),
  };
}
