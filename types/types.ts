import type { PortableTextBlock } from "@portabletext/react";
import type { Image } from "sanity";

type TeamData = {
  title: string;
  name: string;
};

export type AboutPageData = {
  heading: string;
  description: string;
  image?: Image;
  team: TeamData[];
};

export type FormStatus = "idle" | "sending" | "sent" | "error";

type ChampionData = {
  division: string;
  name: string;
  nickname?: string;
  limit: string;
  image: Image;
};

export type ChampionsPageData = {
  description: string;
  champions: ChampionData[];
};

type SlugData = {
  current: "string";
};

export type Sponsor = {
  sponsorName: string;
  sponsorImage: Image;
  href: string;
};

export type HomePageData = {
  upcomingEvent: Event[];
  sponsor: Sponsor[];
  heroImage?: Image;
};

export type NewsArticle = {
  _id: string;
  headline: string;
  summary: string;
  author?: string;
  publicationDate: string;
  slug: SlugData;
  headlineImage: Image;
  content: PortableTextBlock;
};

type WeightClass =
  | "Female Strawweight"
  | "Female Flyweight"
  | "Strawweight"
  | "Flyweight"
  | "Bantamweight"
  | "Lightweight";

type FightStatus = "upcoming" | "completed" | "cancelled";

export const FIGHT_METHODS = {
  ko: "KO",
  tko: "TKO",
  submission: "Submission",
  decision: "Decision",
  draw: "Draw",
  no_contest: "No contest",
  dq: "DQ",
  other: "Other",
  technical_decision: "Technical decision",
} as const;

export type FightMethod = keyof typeof FIGHT_METHODS;

export const DECISION_TYPES = {
  unanimous: "Unanimous",
  split: "Split",
  majority: "Majority",
};

export type DecisionType = keyof typeof DECISION_TYPES;

type FightResult = {
  method: FightMethod;
  winner?: Fighter | null;
  technique?: string;
  round?: number;

  // Official time in m:ss format, e.g. "3:42"
  time?: string;
};

export type Fighter = {
  _id: string;
  name: string;
  slug: SlugData;
  nickname: string;
  image: Image;
  country?: {
    code?: string; // e.g. BZ
    name?: string; // e.g. Belize
  };
  record: {
    wins: number;
    losses: number;
    draws: number;
    noContests?: number;
  };
  weightClass: WeightClass;
};

export type Fight = {
  _key: string;
  redCorner: Fighter;
  blueCorner: Fighter;
  isMainEvent?: boolean;
  scheduledRounds: 1 | 2 | 3 | 4 | 5;
  weightClass: WeightClass;
  status: FightStatus;
  result?: FightResult;
};

export type FightEvent = {
  _id: string;
  name: string;
  slug: SlugData;
  headline: string;
  startsAt: string;
  venue: string;
  city: string;
  status: FightStatus;
  image: Image;
  fightCard: Fight[];
};
