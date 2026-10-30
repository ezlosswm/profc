import Section from "../ui/section";
import Hero from "../Hero";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/lib/sanity";
import type { FightEvent } from "@/types/types";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { sortEventsByAscendingTime } from "@/lib/sort";
import Link from "next/link";
import { formatDateTime } from "@/lib/formatter";
import { getUpcomingEvent } from "@/lib/filter";
import { EVENTS_QUERY } from "@/lib/queries/queries";

type EventsProps = {
  events: FightEvent[];
};

export default async function AllEvents() {
  const events = await sanityFetch<FightEvent[]>({
    query: EVENTS_QUERY,
    errorMessage: "Unable to get list of events",
  });

  return (
    <main className="bg-muted-background">
      <Hero event={sortEventsByAscendingTime(getUpcomingEvent(events!))[0]} />

      <Section aria-labelledby="all-events-title" className="py-20 md:py-28">
        <h2
          id="all-events-title"
          className="font-heading text-5xl uppercase leading-none md:text-6xl"
        >
          All Events
        </h2>

        <UpcomingEvents events={events!} />

        <h3 className="mt-16 text-sm font-semibold text-muted-foreground">
          Past events
        </h3>

        <PastEvents events={events!} />
      </Section>
    </main>
  );
}

function UpcomingEvents({ events }: EventsProps) {
  return (
    <>
      {sortEventsByAscendingTime(events!).map(
        (event) =>
          event.status === "upcoming" && (
            <article
              key={event._id}
              className="mx-auto max-w-7xl mt-10 overflow-hidden group border border-border bg-background grid md:grid-cols-12"
            >
              <Image
                src={urlFor(event.image!).width(1920).height(1080).url()}
                alt={`Event flyer for ${event.name}`}
                width={1920}
                height={1080}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 330px"
                className="aspect-video size-full group-hover:scale-105 transition-transform ease-in-out duration-500 object-cover md:col-span-7 md:aspect-auto md:min-h-80"
                loading="lazy"
              />
              <div className="flex flex-col p-6 md:col-span-5 md:p-10">
                <span className="w-fit bg-primary px-2 py-1 text-xs font-semibold text-white">
                  Upcoming
                </span>
                <h3 className="mt-5 font-heading text-6xl uppercase leading-none md:text-7xl">
                  {event.name}
                </h3>
                <ul className="mt-6 space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Calendar
                      aria-hidden="true"
                      className="size-4 text-primary"
                    />
                    {formatDateTime(event.startsAt)}
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    {event.venue}, {event.city}
                  </li>
                </ul>
                <div className="flex gap-4">
                  <Button
                    variant="link"
                    href={`events/${event.slug.current}`}
                    className="justify-start pl-0 mt-8 group/details gap-1 transition-transform"
                  >
                    View event details
                    <ArrowRight
                      aria-hidden="true"
                      className="shrink-0 size-4 group-hover/details:translate-x-0.5"
                    />
                  </Button>

                  <Button
                    variant="link"
                    href="/contact"
                    className="justify-start pl-0 mt-8 group/tickets gap-1 transition-transform"
                  >
                    <span>Get tickets</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="group-hover/tickets:translate-x-0.5 shrink-0 size-4"
                    />
                  </Button>
                </div>
              </div>
            </article>
          ),
      )}
    </>
  );
}

function PastEvents({ events }: EventsProps) {
  return (
    <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(
        (event) =>
          event.status !== "upcoming" && (
            <li key={event._id}>
              <Link
                href={`events/${event.slug.current}`}
                className="flex h-full flex-col group overflow-hidden border border-border bg-background"
              >
                <Image
                  src={urlFor(event.image!).width(800).height(500).url()}
                  alt={`Fight card for ${event.name}`}
                  width={800}
                  height={500}
                  loading="lazy"
                  className="aspect-16/10 group-hover:scale-105 transition-transform ease-in-out duration-500 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-medium text-muted-foreground">
                    {event.name}
                  </span>
                  <h4 className="mt-2 font-heading text-3xl uppercase leading-tight">
                    {event.headline}
                  </h4>
                  <ul className="mt-auto space-y-2 pt-5 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Calendar
                        aria-hidden="true"
                        className="text-primary size-4 shrink-0"
                      />
                      {formatDateTime(event.startsAt)}
                    </li>

                    <li className="flex items-center gap-2">
                      <MapPin
                        aria-hidden="true"
                        className="text-primary size-4 shrink-0"
                      />
                      {event.venue}, {event.city}
                    </li>
                  </ul>

                  <Button
                    variant="link"
                    className="justify-start pl-0 mt-4 gap-1 group/details"
                  >
                    View event details
                    <ArrowRight
                      aria-hidden="true"
                      className="shrink-0 size-4 group-hover/details:translate-x-0.5"
                    />
                  </Button>
                </div>
              </Link>
            </li>
          ),
      )}
    </ul>
  );
}
