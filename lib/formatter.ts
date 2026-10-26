import type { Event } from "@/types/types";

export function formatToMarqueeArray(event: Event) {
  const item = `${event.name} · ${event.dateLabel} · ${event.venue}, ${event.city}`;
  return Array.from({ length: 6 }, () => item);
}

export function formatNewsPublicationdate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);

  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
