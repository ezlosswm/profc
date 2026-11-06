import { sanityFetch } from "./sanity";

export const LEGAL_PAGE_QUERY = `*[_type == "legalPage" && path == $path][0]{
  _id,
  title,
  path,
  lastUpdated,
  isDraft,
  intro,
  sections[]{
    id,
    heading,
    paragraphs,
    list,
    after,
    link{
      label,
      to
    }
  }
}`;

export interface LegalSection {
  id?: string;
  heading: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
  link?: {
    label?: string;
    to?: string;
  };
}

export interface LegalPageData {
  _id: string;
  title: string;
  path: string;
  lastUpdated: string;
  isDraft?: boolean;
  intro?: string;
  sections?: LegalSection[];
}

export async function getLegalPage(
  path: string,
): Promise<LegalPageData | null> {
  return await sanityFetch({
    query: LEGAL_PAGE_QUERY,
    params: { path: path },
  });
}
