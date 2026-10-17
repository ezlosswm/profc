import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import hero from "@/public/images/hero-sample.webp";
import type { NextEvent } from "@/types/types";
import { connection } from "next/server";
import { Button } from "./ui/button";
import { Countdown } from "./Countdown";
import { client } from "@/sanity/client";
import Section from "./ui/section";
import { urlFor } from "@/sanity/image";

const EVENTS_QUERY = `
  *[_type == "nextEvent" && startsAt >= $now]
  | order(startsAt asc)[0]
`;
const options = {
  next: { revalidate: 30 },
};

export default async function Hero() {
  await connection();

  let nextEvent: NextEvent | null = null;

  try {
    nextEvent = await client.fetch<NextEvent>(
      EVENTS_QUERY,
      { now: new Date().toISOString() },
      options,
    );
  } catch (error) {
    console.error("Query failed: ", (error as Error).message);
  }

  if (!nextEvent) {
    return (
      <section>
        <p>No upcoming event</p>
      </section>
    );
  }

  return (
    <main
      aria-labelledby="hero-title"
      className="relative min-h-[92vh] overflow-hidden isolate bg-background"
    >
      {/* TODO: Fix image alt text */}
      <div className="size-full">
        <Image
          src={urlFor(nextEvent.image!.asset).width(1920).height(1080).url()}
          alt="Upcoming event flyer"
          width={1920}
          height={1080}
          priority
          className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-background md:bg-background/60"
        aria-hidden="true"
      />

      {/* Content */}
      <Section className="mx-auto flex min-h-[92vh] flex-col justify-end pb-16 pt-28 md:pb-24">
        <h1
          id="hero-title"
          className="font-heading uppercase tracking-tight mt-3 leading-[0.85] text-[22vw] sm:text-[9rem] lg:text-[11rem]"
        >
          {nextEvent.name}
        </h1>

        <div className="mt-6 flex gap-4 text-lg font-semibold">
          <p>{nextEvent.dateLabel}</p>

          <div id="divider" className="h-6 w-px bg-foreground/50"></div>

          <div className="flex gap-1 items-center">
            <MapPin className="size-4 text-primary" />
            <p className="text-muted-foreground">
              {nextEvent.venue}, {nextEvent.city}
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-8 lg:items-end lg:justify-between flex-col lg:flex-row">
          <Countdown startsAt={nextEvent.startsAt} />

          {/* Button group */}
          <div className="inline-flex gap-2">
            <Button className="gap-1 group px-6 py-4 font-semibold">
              Get tickets
              <span className="group-hover:translate-x-0.5 transition-transform ease-out">
                <ArrowRight className="size-4" />
              </span>
            </Button>
            <Button variant="outline" className="px-6 py-4 font-semibold">
              Become a sponsors
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
