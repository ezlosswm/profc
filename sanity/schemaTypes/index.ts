import { type SchemaTypeDefinition } from "sanity";
import { eventType } from "./eventType";
import { aboutSectionType } from "./aboutSectionType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, aboutSectionType],
};
