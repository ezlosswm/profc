import { type SchemaTypeDefinition } from "sanity";
import { eventType } from "./eventType";
import { aboutPageType } from "./aboutPageType";
import { championsPageType } from "./championsPageType";
import { allEventsType } from "./allEventsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [allEventsType, eventType, aboutPageType, championsPageType],
};
