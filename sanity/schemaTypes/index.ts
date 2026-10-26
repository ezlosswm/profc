import { type SchemaTypeDefinition } from "sanity";
import { aboutPageType } from "./aboutPageType";
import { championsPageType } from "./championsPageType";
import { allEventsType } from "./allEventsType";
import { homePageType } from "./homePageType";
import { fighterType } from "./fighters";
import { fightsType } from "./fights";
import { fightResult } from "./fightResult";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    aboutPageType,
    allEventsType,
    championsPageType,
    fightsType,
    fighterType,
    fightResult,
    homePageType,
  ],
};
