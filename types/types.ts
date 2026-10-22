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

export type Event = {
  name: string;
  slug: SlugData;
  redCorner: string;
  blueCorner: string;
  dateLabel?: string;
  startsAt: string;
  venue?: string;
  city?: string;
  type?: string;
  image?: ImageAsset;
};

export type Sponsor = {
  sponsorName: string;
  sponsorImage: ImageAsset;
};

export type HomePageData = {
  upcomingEvent: Event[];
  sponsor: Sponsor[];
  heroImage: ImageAsset;
};
