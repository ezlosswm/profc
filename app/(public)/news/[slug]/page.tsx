import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import Loader from "@/components/Loader";
import { Article } from "@/components/news/Article";
import { sanityFetch } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import { createPageMetadata } from "@/lib/seo";
import { NewsArticle } from "@/types/types";
import { NEWS_ARTICLE_QUERY } from "@/lib/queries/queries";

export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
};

async function getNewsArticle(slug: string) {
  return sanityFetch<NewsArticle>({
    query: NEWS_ARTICLE_QUERY,
    errorMessage: `Unable to get news article: ${slug}`,
    params: { slug },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const newsArticle = await getNewsArticle(slug);

  if (!newsArticle) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = newsArticle.headline;
  const description =
    newsArticle.summary?.trim() ||
    `Read the latest news and updates from PROFC Belize.`;

  const image = newsArticle.headlineImage
    ? urlFor(newsArticle.headlineImage).width(1200).height(630).url()
    : undefined;

  return createPageMetadata({
    title,
    description,
    path: `/news/${newsArticle.slug.current}`,

    openGraph: {
      type: "article",
      title: `${title} | PROFC Belize`,
      description,
      image,
      publishedTime: newsArticle.publicationDate
        ? new Date(`${newsArticle.publicationDate}T12:00:00Z`).toISOString()
        : undefined,
    },
  });
}

export default async function Page({ params }: Props) {
  await connection();

  const { slug } = await params;
  const newsArticle = await getNewsArticle(slug);

  if (!newsArticle) {
    notFound();
  }

  return (
    <Suspense fallback={<Loader />}>
      <Article newsArticle={newsArticle} />
    </Suspense>
  );
}
