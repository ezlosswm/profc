import Section from "../ui/section";
import Hero from "../Hero";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/lib/sanity";
import type { Event, ImageAsset } from "@/types/types";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { sortEventsByDescendingTime } from "@/lib/sort";
import { connection } from "next/server";
import Link from "next/link";

const HEROIMAGE_QUERY = `*[_type == "homePage"][0].heroImage`;
const ALL_EVENTS_QUERY = `
  *[_type == "allEvents"]
  | order(startsAt asc)
`;

export default async function AllEvent() {
  await connection();

  const heroImg = await sanityFetch<ImageAsset>({
    query: HEROIMAGE_QUERY,
    errorMessage: "Error getting hero image",
  });

  const allEvents = await sanityFetch<Event[]>({
    query: ALL_EVENTS_QUERY,
    errorMessage: "Event data query failed",
  });

  return (
    <main className="bg-muted-background">
      <Hero
        heroImage={heroImg!}
        event={sortEventsByDescendingTime(allEvents!)[0]}
      />

      <Section aria-labelledby="all-events-title" className="py-20 md:py-28">
        <h2
          id="all-events-title"
          className="font-heading text-5xl uppercase leading-none md:text-6xl"
        >
          All Events
        </h2>
        <article className="mx-auto max-w-7xl mt-10 border border-border bg-background grid md:grid-cols-12">
          <Image
            src={urlFor(sortEventsByDescendingTime(allEvents!)[0].image!.asset)
              .width(1920)
              .height(1080)
              .url()}
            alt={`Event flyer for ${sortEventsByDescendingTime(allEvents!)[0].name}`}
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 330px"
            className="aspect-video size-full object-cover md:col-span-7 md:aspect-auto md:min-h-80"
            loading="lazy"
          />
          <div className="flex flex-col p-6 md:col-span-5 md:p-10">
            <span className="w-fit bg-primary px-2 py-1 text-xs font-semibold text-white">
              Upcoming
            </span>
            <h3 className="mt-5 font-heading text-6xl uppercase leading-none md:text-7xl">
              {sortEventsByDescendingTime(allEvents!)[0].name}
            </h3>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Calendar aria-hidden="true" className="size-4 text-primary" />
                {sortEventsByDescendingTime(allEvents!)[0].dateLabel}
              </li>
              <li className="flex items-center gap-3">
                <MapPin
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary"
                />
                {sortEventsByDescendingTime(allEvents!)[0].venue},{" "}
                {sortEventsByDescendingTime(allEvents!)[0].city}
              </li>
            </ul>

            <Button
              variant="link"
              className="justify-start pl-0 mt-8 group translate-transform"
            >
              <span>Get tickets</span>
              <ArrowRight
                aria-hidden="true"
                className="group-hover:translate-x-0.5"
              />
            </Button>
          </div>
        </article>

        <h3 className="mt-16 text-sm font-semibold text-muted-foreground">
          Past events
        </h3>

        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortEventsByDescendingTime(allEvents!)
            .slice(1)
            .map((event, index) => (
              <li key={index + 1}>
                <Link
                  href={`/events/${event.slug.current}`}
                  className="flex h-full flex-col border border-border bg-background"
                >
                  <Image
                    src={urlFor(event.image!.asset)
                      .width(800)
                      .height(500)
                      .url()}
                    alt={`Fight card for ${event.name}`}
                    width={660}
                    height={412}
                    loading="lazy"
                    className="aspect-16/10 w-full object-fill"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-medium text-muted-foreground">
                      {event.name}
                    </span>
                    <h4 className="mt-2 font-heading text-3xl uppercase leading-tight">
                      {event.redCorner} vs {event.blueCorner}
                    </h4>
                    <ul className="mt-auto space-y-2 pt-5 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Calendar className="text-primary size-4 shrink-0" />
                        {event.dateLabel}
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin className="text-primary size-4 shrink-0" />
                        {event.venue}, {event.city}
                      </li>
                    </ul>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </Section>
    </main>
  );
}
