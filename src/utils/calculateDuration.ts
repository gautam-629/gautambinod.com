export function calculateDuration(start: Date, end?: Date | null): string {
  const endDate = end ?? new Date();
  const months =
    (endDate.getFullYear() - start.getFullYear()) * 12 +
    (endDate.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remainingMonths > 0) parts.push(`${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`);
  return parts.join(" ") || "< 1 mo";
}
