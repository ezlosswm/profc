import type { FightEvent } from "@/types/types";

export function sortEventsByDescendingTime(events: FightEvent[]): FightEvent[] {
  return events.sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

export function sortEventsByAscendingTime(events: FightEvent[]): FightEvent[] {
  return events.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
