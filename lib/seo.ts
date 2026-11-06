import type { Metadata } from "next";
import { SITE_URL } from "@/sanity/env";

export const SITE_NAME = "PROFC Belize";
const defaultImage = `${SITE_URL}/images/profc-og.webp`;

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
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const image = openGraph?.image ?? defaultImage;
  const ogTitle = openGraph?.title ?? `${title} | ${SITE_NAME}`;
  const ogDescription = openGraph?.description ?? description;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: openGraph?.type ?? "website",
      siteName: SITE_NAME,
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
