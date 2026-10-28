import { FightEvent } from "@/types/types";

export function getUpcomingEvent(events: FightEvent[]): FightEvent[] {
  return events.filter((event) => event.status === "upcoming");
}
