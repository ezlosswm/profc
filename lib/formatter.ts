import { NextEvent } from "@/types/types";

export function formatToMarqueeArray(event: NextEvent) {
  const item = `${event.name} · ${event.dateLabel} · ${event.venue}, ${event.city}`;
  return Array.from({ length: 6 }, () => item);
}
