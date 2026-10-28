import type { FightEvent } from "@/types/types";

export function formatToMarqueeArray(event: FightEvent) {
  const item = `${event.name} · ${formatDateTime(event.startsAt)} · ${event.venue}, ${event.city}`;
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
