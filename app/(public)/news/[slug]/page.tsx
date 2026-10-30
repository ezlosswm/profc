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
import { NEWS_QUERY, NEWS_ARTICLE_QUERY } from "@/lib/queries/queries";
import Section from "@/components/ui/section";
import { NewsCard } from "@/components/NewsCard";

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

async function getAllArticles() {
  return sanityFetch<NewsArticle[]>({
    query: NEWS_QUERY,
    errorMessage: `Unable to get news articles`,
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
    `${newsArticle.summary?.trim()} by ${newsArticle.author?.trim()}` ||
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
  const newsArticles = await getAllArticles();

  if (!newsArticle) {
    notFound();
  }

  return (
    <Suspense fallback={<Loader />}>
      <Article newsArticle={newsArticle} />
      {/* 
      <Section className="max-w-3xl! mt-16">
        <h2 className="font-heading text-2xl leading-[0.9]">Read more</h2>
        <ul className="flex mt-6 gap-3">
          {newsArticles!.map((article) => (
            <li key={article._id} className="size-84">
              <NewsCard article={article} />
            </li>
          ))}
        </ul>
      </Section> */}
    </Suspense>
  );
}
