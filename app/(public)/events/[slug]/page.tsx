import Loader from "@/components/Loader";
import { SectionHeading } from "@/components/ui/sectionheading";
import Section from "@/components/ui/section";
import { sanityFetch } from "@/lib/sanity";
import type { FightEvent } from "@/types/types";
import { Suspense } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { formatDateTime } from "@/lib/formatter";

export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
};

type BannerProps = {
  event: FightEvent;
};

const SINGLE_EVENT_QUERY = `*[_type == "events" && slug.current == $slug][0] {
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

function getLastname(name: string): string {
  const [, lastName] = name.split(" ");
  return lastName;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const event = await getEvent(slug);

  return (
    <Suspense fallback={<Loader />}>
      <Banner event={event!} />
      <main aria-labelledby="fight-card-title">
        <Section className="bg-muted-background py-20 md:py-28">
          <SectionHeading id="fight-card-title" heading="Fight Card" />
          <ul className="space-y-6 mt-10">
            {event!.fightCard.map((fight) => (
              <li key={fight._key}>
                <article className="border border-border bg-background">
                  <header className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b px-5 py-3 md:px-8 border-border text-xs font-medium text-muted-foreground">
                    {fight.isMainEvent ? (
                      <span className="bg-primary px-2 py-px font-semibold text-white">
                        Main event
                      </span>
                    ) : (
                      <></>
                    )}
                    <span>{fight.weightClass}</span>
                    <span
                      className="h-3 w-px bg-border"
                      aria-hidden="true"
                    ></span>
                    <span>Rounds {fight.scheduledRounds}</span>
                  </header>
                  <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 md:p-8">
                    {/* Left */}
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="size-24 md:size-36 flex shrink-0 items-center justify-center border border-border">
                        <Image
                          src={urlFor(fight.redCorner.image.asset)
                            .width(200)
                            .height(200)
                            .url()}
                          loading="lazy"
                          width={200}
                          height={200}
                          alt={fight.redCorner.name}
                          className="object-cover object-top"
                        />
                      </div>

                      <div className="min-w-0 border-l-2 pl-4 border-primary">
                        <p className="text-xs font-medium text-muted-foreground">
                          Red corner
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <p className="font-heading uppercase leading-none text-4xl md:text-5xl">
                            {getLastname(fight.redCorner.name)}
                          </p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <span>Country</span>
                            <span
                              className="font-medium
                            "
                            >
                              {fight.redCorner.country?.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>Record</span>
                            <span>
                              {fight.redCorner.record.wins} -{" "}
                              {fight.redCorner.record.losses} -{" "}
                              {fight.redCorner.record.draws}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center */}
                    <div className="flex items-center gap-4" aria-hidden="true">
                      <span className="font-heading text-primary text-3xl md:text-5xl">
                        VS
                      </span>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4 md:gap-5 md:flex-row-reverse md:text-right">
                      <div className="size-24 md:size-36 flex shrink-0 items-center justify-center border border-border">
                        <Image
                          src={urlFor(fight.blueCorner.image.asset)
                            .width(200)
                            .height(200)
                            .auto("format")
                            .fit("crop")
                            .url()}
                          loading="lazy"
                          width={200}
                          height={200}
                          alt={fight.blueCorner.name}
                          className="object-cover object-top"
                        />
                      </div>

                      <div className="min-w-0 border-l-2 md:border-l-0 md:border-r-2 md:pl-0 pl-4 md:pr-4 border-muted-foreground">
                        <p className="text-xs font-medium text-muted-foreground">
                          Blue corner
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <p className="font-heading uppercase leading-none text-4xl md:text-5xl">
                            {getLastname(fight.blueCorner.name)}
                          </p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <span>Country</span>
                            <span
                              className="font-medium
                            "
                            >
                              {fight.blueCorner.country?.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>Record</span>
                            <span>
                              {fight.blueCorner.record.wins} -{" "}
                              {fight.blueCorner.record.losses} -{" "}
                              {fight.blueCorner.record.draws}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {fight.status !== "completed" ? (
                    <footer className="border-t border-border px-5 py-4 md:px-8">
                      <p className="text-sm text-muted-foreground">
                        Official results not published yet
                      </p>
                    </footer>
                  ) : (
                    <>{/* <span>winner: </span> */}</>
                  )}
                </article>
              </li>
            ))}
          </ul>
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
          className="justify-start gap-1 group pl-0"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 group-hover:-translate-x-0.5"
          />
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
            <Calendar
              aria-hidden="true"
              className="size-4 shrink-0 text-primary"
            />
            <span className="font-semibold">
              {formatDateTime(event.startsAt)}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <MapPin
              aria-hidden="true"
              className="size-4 shrink-0 text-primary"
            />
            <span className="text-muted-foreground">
              {event.venue}, {event.city}
            </span>
          </p>
        </div>
      </Section>
    </section>
  );
}
