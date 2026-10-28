import Loader from "@/components/Loader";
import { sanityFetch } from "@/lib/sanity";
import type { FightEvent } from "@/types/types";
import { Suspense } from "react";
import { urlFor } from "@/sanity/image";
import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { Events } from "@/components/events/Event";
import { SINGLE_EVENT_QUERY } from "@/lib/queries/queries";

export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
};

async function getEvent(slug: string) {
  return sanityFetch<FightEvent>({
    query: SINGLE_EVENT_QUERY,
    errorMessage: `Unable to get event ${slug}`,
    params: { slug },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return {
      title: "Event Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = event.name;
  const description =
    `${event.name} takes place at ${event.venue}, ${event.city}. ` +
    `Get event details and the latest information from PROFC Belize.`;

  const image = event.image?.asset
    ? urlFor(event.image.asset).width(1200).height(630).url()
    : undefined;

  return createPageMetadata({
    title,
    description,
    path: `/events/${slug}`,
    openGraph: {
      title: `${title} | PROFC Belize`,
      description,
      image,
    },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const event = await getEvent(slug);

  return (
    <Suspense fallback={<Loader />}>
      <Events event={event!} />
    </Suspense>
  );
}
