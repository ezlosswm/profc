import { type SchemaTypeDefinition } from "sanity";
import { eventType } from "./eventType";
import { aboutPageType } from "./aboutPageType";
import { championsPageType } from "./championsPageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, aboutPageType, championsPageType],
};
