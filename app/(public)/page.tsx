import Hero from "@/components/Hero";
import Image from "next/image";
import hero from "@/public/images/hero-sample.webp";
import { Marquee } from "@/components/MarqueeBanner";
import SponsorsAndPartners from "@/components/SponsorsAndPartners";
import { LatestNews } from "@/components/LatestNews";
import { Suspense } from "react";

export function Home() {
  return (
    <>
      <Suspense
        fallback={
          <main
            aria-labelledby="hero-title"
            className="relative min-h-[92vh] overflow-hidden isolate bg-background"
          >
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

            <div className="flex min-h-[92vh] items-center justify-center">
              Loading upcoming event...
              <p className="text-6xl font-heading animate-pulse text-foreground/70"></p>
            </div>
          </main>
        }
      >
        <Hero />
      </Suspense>
      <Marquee />
      <LatestNews />
      <SponsorsAndPartners />
    </>
  );
}

export default Home;
