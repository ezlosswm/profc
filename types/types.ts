import type { PortableTextBlock } from "@portabletext/react";
import { Reference } from "sanity";
export type ImageAsset = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

type TeamData = {
  title: string;
  name: string;
};

export type AboutPageData = {
  heading: string;
  description: string;
  image?: ImageAsset;
  team: TeamData[];
};

export type FormStatus = "idle" | "sending" | "sent" | "error";

type ChampionData = {
  division: string;
  name: string;
  nickname?: string;
  limit: string;
  image: ImageAsset;
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
  sponsorImage: ImageAsset;
};

export type HomePageData = {
  upcomingEvent: Event[];
  sponsor: Sponsor[];
  heroImage?: ImageAsset;
};

export type NewsArticle = {
  _id: string;
  headline: string;
  summary: string;
  publicationDate: string;
  slug: SlugData;
  headlineImage: ImageAsset;
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

export type FightMethod =
  | "ko"
  | "tko"
  | "submission"
  | "decision"
  | "draw"
  | "no_contest"
  | "dq"
  | "other";

export type DecisionType = "unanimous" | "split" | "majority";

type FightResult = {
  method: FightMethod;
  winner?: Reference;
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
  image: ImageAsset;
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
  image: ImageAsset;
  fightCard: Fight[];
};
