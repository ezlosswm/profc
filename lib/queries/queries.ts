export const EVENTS_QUERY = `*[_type == "events"]`;

export const SINGLE_EVENT_QUERY = `*[_type == "events" && slug.current == $slug][0] {
  ...,
  fightCard[] {
    ...,
    redCorner-> {
      _id,
      name,
      slug,
      nickname,
      image,
      country,
      record,
      weightClass
    },
    blueCorner-> {
      _id,
      name,
      slug,
      nickname,
      image,
      country,
      record,
      weightClass
    }
  }
}`;

export const HOMEPAGE_QUERY = `
  *[_type == "homePage"][0]`;

export const CHAMPIONS_QUERY = `*[_type == "championsPage"][0]`;

export const ABOUT_QUERY = `*[_type == "aboutPage"][0]`;

export const NEWS_QUERY = `*[_type == "news"]`;

export const NEWS_ARTICLE_QUERY = `
  *[_type == "news" && slug.current == $slug][0]
`;
