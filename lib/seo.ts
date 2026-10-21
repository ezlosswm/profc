import type { Metadata } from "next";

const siteName = "PROFC Belize";

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `https://profc.vercel.app/${path}`;
  const image = "https://profc.vercel.app/images/profc-og.webp";

  return {
    title,
    description,

    alternates: {
      canonical: path,
    },

    openGraph: {
      type: "website",
      siteName,
      locale: "en_BZ",
      url,
      title: `${title} | ${siteName}`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteName}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [image],
    },
  };
}
