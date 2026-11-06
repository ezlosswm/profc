import { type SchemaTypeDefinition } from "sanity";
import { aboutPageType } from "./aboutPageType";
import { championsPageType } from "./championsPageType";
import { homePageType } from "./homePageType";
import { fighterType } from "./fighters";
import { fightsType } from "./fights";
import { fightResult } from "./fightResult";
import { newsType } from "./newsType";
import { eventType } from "./events";
import { generalInfoType } from "./generalInfo";
import { legalLink } from "./legalLink";
import { legalSection } from "./legalSection";
import { legalPage } from "./legalPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    aboutPageType,
    championsPageType,
    eventType,
    fightsType,
    fighterType,
    fightResult,
    generalInfoType,
    homePageType,
    legalLink,
    legalSection,
    legalPage,
    newsType,
  ],
};
