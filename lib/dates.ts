export default function formatTime(dateString: string): string {
  const match = dateString.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})$/);

  if (!match) {
    throw new Error("Invalid date format. Expected YYYY-MM-DD HH:mm");
  }

  const [, date, hour, minute] = match;
  const utcString = `${date}T${hour}:${minute}:00.000Z`;
  const timestamp = Date.parse(utcString);

  if (
    !Number.isFinite(timestamp) ||
    new Date(timestamp).toISOString().slice(0, 16) !==
      `${date}T${hour}:${minute}`
  ) {
    throw new Error("Invalid date or time");
  }

  const belizeDate = new Date(timestamp - 6 * 60 * 60 * 1000);

  return `${belizeDate.toISOString().slice(0, 19)}-06:00`;
}
