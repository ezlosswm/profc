export type NextEvent = {
  name: string;
  dateLabel?: string;
  startsAt: string;
  venue?: string;
  city?: string;
  type?: string;
  image?: ImageAsset;
};

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

export type AboutSectionData = {
  heading: string;
  description: string;
  image?: ImageAsset;
  team: TeamData[];
};
