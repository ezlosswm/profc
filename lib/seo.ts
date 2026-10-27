import type { Metadata } from "next";

const siteName = "PROFC Belize";
const siteUrl = "https://profc.vercel.app";
const defaultImage = `${siteUrl}/images/profc-og.webp`;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  openGraph?: {
    type?: "website" | "article";
    title?: string;
    description?: string;
    image?: string;
    publishedTime?: string;
  };
};

export function createPageMetadata({
  title,
  description,
  path,
  openGraph,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const image = openGraph?.image ?? defaultImage;
  const ogTitle = openGraph?.title ?? `${title} | ${siteName}`;
  const ogDescription = openGraph?.description ?? description;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: openGraph?.type ?? "website",
      siteName,
      locale: "en_BZ",
      url,
      title: ogTitle,
      description: ogDescription,
      ...(openGraph?.type === "article" && openGraph.publishedTime
        ? { publishedTime: openGraph.publishedTime }
        : {}),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  };
}
