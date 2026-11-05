"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/sectionheading";

type FighterSlide = {
  id: string;
  name: string;
  imageUrl: string;
};

type FightersCarouselProps = {
  fighters: FighterSlide[];
};

export default function FightersCarousel({ fighters }: FightersCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToFighter(index: number) {
    const track = trackRef.current;
    const slide = track?.children.item(index);

    if (track && slide instanceof HTMLElement) {
      track.scrollTo({
        left: slide.offsetLeft - track.offsetLeft,
        behavior: "smooth",
      });
    }
  }

  function updateActiveFighter() {
    const track = trackRef.current;

    if (!track) return;

    const slides = Array.from(track.children).filter(
      (slide): slide is HTMLElement => slide instanceof HTMLElement,
    );
    const nearestIndex = slides.reduce(
      (nearest, slide, index) => {
        const distance = Math.abs(
          slide.offsetLeft - track.offsetLeft - track.scrollLeft,
        );
        return distance < nearest.distance ? { index, distance } : nearest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index;

    setActiveIndex(nearestIndex);
  }

  if (fighters.length === 0) return null;

  return (
    <section aria-labelledby="fighters-title">
      <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
        <SectionHeading id="fighters-title" heading="Our Fighters" />

        <div className="flex shrink-0 items-center gap-3">
          <span
            className="hidden text-sm tabular-nums text-muted-foreground sm:inline"
            aria-live="polite"
          >
            <span className="text-foreground">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="px-1.5">/</span>
            {String(fighters.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Previous fighter"
            onClick={() => scrollToFighter(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="inline-flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next fighter"
            onClick={() =>
              scrollToFighter(Math.min(fighters.length - 1, activeIndex + 1))
            }
            disabled={activeIndex === fighters.length - 1}
            className="inline-flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Fighter carousel"
        aria-roledescription="carousel"
        onScroll={updateActiveFighter}
        className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {fighters.map((fighter) => (
          <article
            key={fighter.id}
            aria-roledescription="slide"
            className="group relative w-[88%] flex-none snap-start overflow-hidden border border-border bg-muted-background sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src={fighter.imageUrl}
                alt={`${fighter.name} headliner`}
                fill
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 48vw, 32vw"
                loading="lazy"
                className="object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent"
              />
              <h3 className="absolute inset-x-0 bottom-0 border-l-4 border-primary px-5 py-5 font-heading text-3xl uppercase leading-none text-foreground transition-[padding] duration-300 group-hover:pl-7 md:px-6 md:text-4xl motion-reduce:transition-none">
                {fighter.name}
              </h3>
            </div>
          </article>
        ))}
        <div
          aria-hidden="true"
          className="w-[12%] flex-none sm:w-1/2 lg:w-2/3"
        />
      </div>

      <div
        className="mt-6 h-0.5 w-full bg-border"
        role="progressbar"
        aria-label="Carousel position"
        aria-valuemin={1}
        aria-valuemax={fighters.length}
        aria-valuenow={activeIndex + 1}
      >
        <div
          className="h-full bg-primary transition-[width] duration-300"
          style={{ width: `${((activeIndex + 1) / fighters.length) * 100}%` }}
        />
      </div>
    </section>
  );
}
