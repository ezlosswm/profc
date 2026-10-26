import { Suspense } from "react";
import Loader from "@/components/Loader";
import { sanityFetch } from "@/lib/sanity";
import { NewsArticle } from "@/types/types";
import { connection } from "next/server";
import { Article } from "@/components/news/Article";

export const instant = false;

// export const metadata = createPageMetadata({
//   title: "Upcoming MMA Events in Belize | PROFC Belize",
//   description:
//     "Explore upcoming PROFC Belize MMA events, fight cards, event dates, venues, and ticket information. Find out when the next fight takes place.",
//   path: "/events",
// });

type Props = {
  params: Promise<{ slug: string }>;
};

const NEWS_ARTICLE_QUERY = `*[_type == "news" && slug.current == $slug][0]`;

export default async function Page({ params }: Props) {
  await connection();

  const { slug } = await params;

  const newsArticle = await sanityFetch<NewsArticle>({
    query: NEWS_ARTICLE_QUERY,
    errorMessage: `Unable to get news article: ${slug}`,
    params: { slug: slug },
  });

  return (
    <Suspense fallback={<Loader />}>
      <Article newsArticle={newsArticle!} />
    </Suspense>
  );
}
