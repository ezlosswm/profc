import Loader from "@/components/Loader";
import { SectionHeading } from "@/components/ui/sectionheading";
import Section from "@/components/ui/section";
import { sanityFetch } from "@/lib/sanity";
import type { Event } from "@/types/types";
import { Suspense } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
};

type BannerProps = {
  event: Event;
};

const SINGLE_EVENT_QUERY = `*[_type == "allEvents" && slug.current == $slug][0]`;

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const singleEvent = await sanityFetch<Event>({
    query: SINGLE_EVENT_QUERY,
    errorMessage: `Unable to get event ${slug}`,
    params: { slug: slug },
  });

  return (
    <Suspense fallback={<Loader />}>
      <Banner event={singleEvent!} />
      <main aria-labelledby="news-title">
        <Section className="min-h-[80vh] bg-muted-background pb-20 pt-32 md:pb-28 md:pt-40">
          <h1>Post: {singleEvent!.name}</h1>
          <SectionHeading heading="Fight Card" />
        </Section>
      </main>
    </Suspense>
  );
}

function Banner({ event }: BannerProps) {
  return (
    <section
      aria-labelledby="event-title"
      className="relative isolate overflow-hidden bg-background"
    >
      <Image
        src={urlFor(event.image!.asset).width(1920).height(1080).url()}
        width={1920}
        height={1080}
        alt={`Event flyer for ${event.name}`}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-background/70"
      />
      <Section className="min-h-[70vh] mx-auto flex justify-end pt-28 pb-16 md:pb-20 flex-col">
        <Button
          href="/events"
          variant="link"
          className="justify-start gap-2 group pl-0"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-0.5" />
          <span>All events</span>
        </Button>

        <h1
          id="event-title"
          className="mt-12 font-heading leading-[0.85] uppercase tracking-tight sm:text-[8rem] text-[20vw] lg:text-[9rem]"
        >
          {event.name}
        </h1>

        <div className="mt-6 flex flex-col gap-2 text-lg sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <p className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0 text-primary" />
            <span className="font-semibold">{event.dateLabel}</span>
          </p>

          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" />
            <span className="text-muted-foreground">
              {event.venue}, {event.city}
            </span>
          </p>
        </div>
      </Section>
    </section>
  );
}
