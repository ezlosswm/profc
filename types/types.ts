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

export type ChampionsPageData = {
  description: string;
  champions: Fighter[];
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
  | "Female Bantamweight"
  | "Female Featherweight"
  | "Strawweight"
  | "Flyweight"
  | "Bantamweight"
  | "Featherweight"
  | "Lightweight"
  | "Welterweight"
  | "Middleweight"
  | "Light Heavyweight"
  | "Heavyweight";

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

export type SocialPlatform = {
  platform: string;
  url: string;
};

export type Fighter = {
  _id: string;
  image: Image;
  name: string;
  nickname: string;
  isChampion: boolean;
  championships?: WeightClass[];
  slug: SlugData;
  dob: string;
  height: string;
  club: string;
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
  socialLinks: {
    socialPlatforms: SocialPlatform;
    href: string;
  }[];
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

export type GeneralInfo = {
  _id: string;
  contactNumber: string;
  primaryEmail: string;
  socialLinks: SocialPlatform[];
};
