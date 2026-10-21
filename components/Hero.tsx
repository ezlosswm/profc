import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import type { ImageAsset, Event } from "@/types/types";
import { Button } from "./ui/button";
import { Countdown } from "./Countdown";
import Section from "./ui/section";
import { urlFor } from "@/sanity/image";

type HeroProps = {
  heroImage: ImageAsset;
  event: Event;
};

export default async function Hero({ heroImage, event }: HeroProps) {
  return (
    <main
      aria-labelledby="hero-title"
      className="relative min-h-[92vh] overflow-hidden isolate bg-background"
    >
      {/* TODO: Fix image alt text */}
      <div className="size-full">
        <Image
          src={urlFor(heroImage).width(1920).height(1080).url()}
          alt="Upcoming event flyer"
          width={1920}
          height={1080}
          priority
          className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-background/60"
        aria-hidden="true"
      />

      {/* Content */}
      <Section className="mx-auto flex min-h-[92vh] flex-col justify-end pb-16 pt-28 md:pb-24">
        <h1
          id="hero-title"
          className="font-heading uppercase tracking-tight mt-3 leading-[0.85] text-[22vw] sm:text-[9rem] lg:text-[11rem]"
        >
          {event.name}
        </h1>

        <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 text-lg font-semibold">
          <p>{event.dateLabel}</p>

          <div
            id="divider"
            className="h-6 w-px bg-foreground/50 hidden sm:block"
          ></div>

          <div className="flex gap-2 items-center">
            <MapPin aria-hidden="true" className="size-4 text-primary" />
            <p className="text-muted-foreground">
              {event.venue}, {event.city}
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-8 lg:items-end lg:justify-between flex-col lg:flex-row">
          <Countdown startsAt={event.startsAt} />

          {/* Button group */}
          <div className="inline-flex gap-2">
            <Button
              href="/contact"
              className="gap-1 group px-6 py-4 font-semibold"
            >
              Get tickets
              <span className="group-hover:translate-x-0.5 transition-transform ease-out">
                <ArrowRight className="size-4" />
              </span>
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="px-6 py-4 font-semibold"
            >
              Become a sponsors
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
