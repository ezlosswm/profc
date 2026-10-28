import type { Event } from "@/types/types";

export function formatToMarqueeArray(event: Event) {
  const item = `${event.name} · ${event.dateLabel} · ${event.venue}, ${event.city}`;
  return Array.from({ length: 6 }, () => item);
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);

  return Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
