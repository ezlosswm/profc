import { type SchemaTypeDefinition } from "sanity";
import { aboutPageType } from "./aboutPageType";
import { championsPageType } from "./championsPageType";
import { allEventsType } from "./allEventsType";
import { homePageType } from "./homePageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutPageType, allEventsType, championsPageType, homePageType],
};
