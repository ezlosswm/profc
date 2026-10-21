import { type SchemaTypeDefinition } from "sanity";
import { eventType } from "./eventType";
import { aboutPageType } from "./aboutPageType";
import { championsPageType } from "./championsPageType";
import { allEventsType } from "./allEventsType";
import { homePageType } from "./homePageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    aboutPageType,
    allEventsType,
    championsPageType,
    eventType,
    homePageType,
  ],
};
