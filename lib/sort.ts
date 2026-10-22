import type { Event } from "@/types/types";

export function sortEventsByDescendingTime(events: Event[]): Event[] {
  return events.sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

export function sortEventsByAscendingTime(events: Event[]): Event[] {
  return events.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
