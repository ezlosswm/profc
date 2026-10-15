import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import hero from "@/public/images/hero-sample.webp";
import { Button } from "./ui/button";
import { Countdown } from "./Countdown";
import { nextEvent } from "@/data/events";

export function Hero() {
  return (
    <main className="relative min-h-[92vh] overflow-hidden isolate bg-background">
      {/* TODO: Fix image alt text */}
      <div className="size-full">
        <Image
          src={hero}
          alt="Upcoming event flyer"
          width={1000}
          height={1000}
          priority
          className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-background md:bg-background/50"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <div>
          <p className="text-sm text-primary">Events - Up next</p>
          <h1
            id="hero-title"
            className="font-heading uppercase tracking-tight mt-3 leading-[0.85] text-[22vw] sm:text-[9rem] lg:text-[11rem]"
          >
            PROFC 24
          </h1>
        </div>

        <div className="mt-6 flex gap-4 text-lg font-semibold">
          <p>{nextEvent.dateLabel}</p>

          <div id="divider" className="h-6 w-px bg-foreground/50"></div>

          <div className="flex gap-1 items-center">
            <MapPin className="size-4 text-primary" />
            <p className="text-foreground/70">
              {nextEvent.venue}, {nextEvent.city}
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-8 lg:items-end lg:justify-between flex-col lg:flex-row">
          {/* Countdown */}
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
      </div>
    </main>
  );
}
